const format = require('pg-format');
const query = require('../../database/query');
const getPageData = require('../lib/get-page-data');
const renewTopLevelValues = require('../lib/renew-top-level-values');
const trimStrings = require('../lib/trim-strings');
const validateString = require('../lib/validate-string');
const verifyErrorPresence = require('../lib/verify-error-presence');

module.exports = class Theatre {

	constructor (props = {}) {
		this.id = props.id;
		this.name = props.name;
		this.pageTitleText = props.pageTitleText;
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
						SELECT ${format.literal(this.name)}
						WHERE NOT EXISTS (
							SELECT id
							FROM theatres
							WHERE name = ${format.literal(this.name)}
						)
						RETURNING id
					),
					s AS (
						SELECT id FROM theatres
						WHERE name = ${format.literal(this.name)}
					)
					SELECT id FROM i
					UNION ALL
					SELECT id FROM s`,
			isReqdResult: true
		}

		return query(queryData);
	}

	edit () {
		const queryData = {
			text: `SELECT * FROM theatres WHERE id=${format.literal(this.id)}`,
			isReqdResult: true
		}

		const _this = this;

		return query(queryData)
			.then(([theatre] = theatre) => {
				renewTopLevelValues(_this, theatre);

				const page = getPageData(_this, 'update');

				return { page, theatre: _this };
			});
	}

	update () {
		this.validate();

		if (verifyErrorPresence(this)) {
			this.hasError = true;
			const page = getPageData(this, 'update');
			return Promise.resolve({ page, theatre: this });
		}

		return this.validateInDb()
			.then(() => {
				this.hasError = verifyErrorPresence(this);

				const page = getPageData(this, 'update');

				if (this.hasError) return Promise.resolve({ page, theatre: this });

				const queryData = {
					text:	`UPDATE theatres SET
							name=${format.literal(this.name)}
							WHERE id=${format.literal(this.id)}
							RETURNING id`,
					isReqdResult: true
				}

				return query(queryData)
					.then(([theatre] = theatre) => ({ page, theatre }));
			});
	}

	delete () {
		const queryData = {
			text: `DELETE FROM theatres WHERE id=${format.literal(this.id)} RETURNING name`,
			isReqdResult: true
		}

		const _this = this;

		return query(queryData)
			.then(([theatre] = theatre) => {
				renewTopLevelValues(_this, theatre);

				const page = getPageData(_this, 'delete');

				return { page, theatre: _this };
			});
	}

	show () {
		const theatre = query({
			text: `SELECT * FROM theatres WHERE id = ${format.literal(this.id)}`,
			isReqdResult: true
		});

		const productions = query({
			text: `SELECT * FROM productions WHERE theatre_id = ${format.literal(this.id)}`
		});

		const _this = this;

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
