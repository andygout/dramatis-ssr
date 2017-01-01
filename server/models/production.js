const format = require('pg-format');
const query = require('../../database/query');
const constants = require('../lib/constants');
const pgFormatValues = require('../lib/pg-format-values');
const renewValues = require('../lib/renew-values');
const trimStrings = require('../lib/trim-strings');
const verifyErrorPresence = require('../lib/verify-error-presence');
const getPageData = require('../lib/page-data');

const Theatre = require('./theatre');

module.exports = class Production {

	constructor (props = {}) {
		this.id = props.id || null;
		this.title = props.title;
		this.preEditedTitle = props.preEditedTitle;
		this.theatre = new Theatre({ id: props.theatre_id, name: props.theatre_name });
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

		return this.theatre.create()
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
				renewValues(_this, production);
				renewValues(_this.theatre, { id: production.theatre_id, name: production.theatre_name });

				const page = getPageData(_this, 'update');

				return { page, production: _this };
			});
	}

	update () {
		this.validate();
		this.theatre.validate();

		this.hasError = verifyErrorPresence(this);

		const page = getPageData(this, 'update');

		if (this.hasError) return Promise.resolve({ page, production: this });

		const data = pgFormatValues(this);

		return this.theatre.create()
			.then(([theatre] = theatre) => {
				const productionQueryData = {
					text:	`UPDATE productions SET
							title = ${data.title},
							theatre_id = ${theatre.id}
							WHERE id = ${data.id}
							RETURNING id`,
					isReqdResult: true
				}

				return query(productionQueryData)
					.then(([production] = production) => ({ page, production }));
			});
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
				renewValues(_this, production);

				const page = getPageData(_this, 'delete');

				return { page, production: _this };
			});
	}

	show () {
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
				renewValues(_this, production);
				renewValues(_this.theatre, { id: production.theatre_id, name: production.theatre_name });

				const page = getPageData(_this, 'show');

				return { page, production: _this };
			});
	}

	static list () {
		const text =	`SELECT
						productions.id,
						productions.title,
						theatres.id AS theatre_id,
						theatres.name AS theatre_name
						FROM productions
						INNER JOIN theatres ON theatre_id = theatres.id
						ORDER BY id ASC`;

		return query({ text })
			.then(productionsRows => {
				const productions = productionsRows.map(production => new Production(production));
				return { productions };
			});
	}

}
