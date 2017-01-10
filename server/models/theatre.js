const format = require('pg-format');
const query = require('../../database/query');
const getPageData = require('../lib/page-data');
const pgFormatValues = require('../lib/pg-format-values');
const renewTopLevelValues = require('../lib/renew-top-level-values');
const trimStrings = require('../lib/trim-strings');
const validateString = require('../lib/validate-string');
const verifyErrorPresence = require('../lib/verify-error-presence');

module.exports = class Theatre {

	constructor (props = {}) {
		this.id = props.id;
		this.name = props.name;
		this.preEditedName = props.preEditedName;
		this.productions = [];
		this.hasError = false;
		this.errors = {};
	}

	validate () {
		trimStrings(this);

		const nameErrors = validateString(this.name, 'Name');
		if (nameErrors.length) this.errors.name = nameErrors;
	}

	validateInDb () {
		const text = 	`SELECT 1
						FROM theatres
						WHERE name = ${format.literal(this.name)}
						AND id != ${format.literal(this.id)}`;

		return query({ text })
			.then(result => {
				if (result.length) this.errors.name = ['Name already exists'];
			});
	}

	renewValues (props = {}) {
		const Production = require('./production');

		renewTopLevelValues(this, props);

		this.productions = props.productions ? props.productions.map(production => new Production(production)) : [];
	}

	create () {
		const queryData = {
			text:	`WITH
					i AS (
						INSERT INTO theatres (name)
						SELECT ${this.name}
						WHERE NOT EXISTS (
							SELECT id
							FROM theatres
							WHERE name = ${this.name}
						)
						RETURNING id
					),
					s AS (
						SELECT id FROM theatres
						WHERE name = ${this.name}
					)
					SELECT id FROM i
					UNION ALL
					SELECT id FROM s`,
			isReqdResult: true
		}

		return query(queryData);
	}

	edit () {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `SELECT * FROM theatres WHERE id=${id}`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([theatre] = theatre) => {
				renewTopLevelValues(_this, theatre);

				const page = getPageData(_this, 'update');

				return { page, theatre: _this };
			});
	}

	update () {
		this.validate();

		return this.validateInDb()
			.then(() => {
				this.hasError = verifyErrorPresence(this);

				const page = getPageData(this, 'update');

				if (this.hasError) return Promise.resolve({ page, theatre: this });

				const data = pgFormatValues(this);

				const queryData = {
					text: `UPDATE theatres SET name=${data.name} WHERE id=${data.id} RETURNING id`,
					isReqdResult: true
				}

				return query(queryData)
					.then(([theatre] = theatre) => ({ page, theatre }));
			});
	}

	delete () {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `DELETE FROM theatres WHERE id=${id} RETURNING name`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([theatre] = theatre) => {
				renewTopLevelValues(_this, theatre);

				const page = getPageData(_this, 'delete');

				return { page, theatre: _this };
			});
	}

	show () {
		const _this = this;

		const id = format.literal(this.id);

		const theatre = query({
			text: `SELECT * FROM theatres WHERE id = ${id}`,
			isReqdResult: true
		});

		const productions = query({
			text: `SELECT * FROM productions WHERE theatre_id = ${id}`
		});

		return Promise.all([theatre, productions])
			.then(([[theatre], productions] = [theatre, productions]) => {
				_this.renewValues(Object.assign(theatre, { productions }));

				const page = getPageData(_this, 'show');

				return { page, theatre: _this };
			});
	}

	static list () {
		const text = 'SELECT * FROM theatres ORDER BY id ASC';

		return query({ text })
			.then(theatresRows => {
				const theatres = theatresRows.map(theatre => new Theatre(theatre));
				return { theatres };
			});
	}

}
