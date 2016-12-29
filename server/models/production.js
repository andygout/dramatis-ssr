const format = require('pg-format');
const query = require('../../database/query');
const constants = require('../lib/constants');
const pgFormatValues = require('../lib/pg-format-values');
const trimStrings = require('../lib/trim-strings');
const verifyErrorPresence = require('../lib/verify-error-presence');
const getPageData = require('../lib/page-data');

const Theatre = require('./theatre');

module.exports = class Production {

	constructor (props = {}) {
		this.id = props.id || null;
		this.title = props.title;
		this.preEditedTitle = props.preEditedTitle;
		this.theatre = new Theatre({ name: props.theatreName });
	}

	validateTitle () {
		const titleErrors = [];
		if (this.title.length < constants.STRING_MIN_LENGTH) titleErrors.push('Title is too short');
		if (this.title.length > constants.STRING_MAX_LENGTH) titleErrors.push('Title is too long');
		return titleErrors;
	}

	validate () {
		trimStrings(this);

		this.errors = {};

		const titleErrors = this.validateTitle();
		if (titleErrors.length) this.errors.title = titleErrors;
	}

	renewValues (row) {
		for (const property in this) if (this.hasOwnProperty(property) && row[property]) this[property] = row[property];
	}

	new () {
		const page = getPageData(this, 'create');
		return { page, production: this };
	}

	create () {
		this.validate();
		this.theatre.validate();

		this.hasError = verifyErrorPresence(this);

		const page = getPageData(this, 'create');

		if (this.hasError) return Promise.resolve({ page, production: this });

		const data = pgFormatValues(this);

		const theatreQueryData = {
			text:	`WITH
					i AS (
						INSERT INTO theatres (name)
						SELECT ${data.theatre.name}
						WHERE NOT EXISTS (
							SELECT id
							FROM theatres
							WHERE name = ${data.theatre.name}
						)
						RETURNING id
					),
					s AS (
						SELECT id FROM theatres
						WHERE name = ${data.theatre.name}
					)
					SELECT id FROM i
					UNION ALL
					SELECT id FROM s`,
			isReqdResult: true
		}

		return query(theatreQueryData)
			.then(([theatre] = theatre) => {
				const productionQueryData = {
					text:	`INSERT INTO productions (title, theatre_id)
							VALUES (${data.title}, ${theatre.id})
							RETURNING id`,
					isReqdResult: true
				}

				return query(productionQueryData)
					.then(([production] = production) => ({ page, production }));
			});
	}

	edit () {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text:	`SELECT productions.id, productions.title, theatres.id AS theatre_id, theatres.name AS theatre_name
					FROM productions
					INNER JOIN theatres ON theatre_id = theatres.id
					WHERE productions.id = ${id}`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([production] = production) => {
				_this.renewValues(production);
				_this.theatre.renewValues({ id: production.theatre_id, name: production.theatre_name });

				const page = getPageData(_this, 'update');

				return { page, production: _this };
			});
	}

	update () {
		this.validate();

		const page = getPageData(this, 'update');

		if (Object.keys(this.errors).length) return Promise.resolve({ page, production: this });

		const data = this.pgFormatValues();

		const queryData = {
			text: `UPDATE productions SET title=${data.title} WHERE id=${data.id} RETURNING id`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([production] = production) => ({ page, production }));
	}

	delete () {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `DELETE FROM productions WHERE id=${id} RETURNING title`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([production] = production) => {
				_this.renewValues(production);

				const page = getPageData(_this, 'delete');

				return { page, production: _this };
			});
	}

	show () {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `SELECT * FROM productions WHERE id=${id}`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([production] = production) => {
				_this.renewValues(production);

				const page = getPageData(_this, 'show');

				return { page, production: _this };
			});
	}

	static list () {
		const text = 'SELECT * FROM productions ORDER BY id ASC';

		return query({ text })
			.then(productionsRows => {
				const productions = productionsRows.map(production => new Production(production));
				return { productions };
			});
	}

}
