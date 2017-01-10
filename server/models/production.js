const format = require('pg-format');
const query = require('../../database/query');
const getPageData = require('../lib/get-page-data');
const pgFormatValues = require('../lib/pg-format-values');
const renewTopLevelValues = require('../lib/renew-top-level-values');
const trimStrings = require('../lib/trim-strings');
const validateString = require('../lib/validate-string');
const verifyErrorPresence = require('../lib/verify-error-presence');

module.exports = class Production {

	constructor (props = {}) {
		const Theatre = require('./theatre');

		this.id = props.id;
		this.title = props.title;
		this.preEditedTitle = props.preEditedTitle;
		this.theatre = new Theatre({ id: props.theatre_id, name: props.theatre_name });
		this.hasError = false;
		this.errors = {};
	}

	validate () {
		trimStrings(this);

		const titleErrors = validateString(this.title, 'Title');
		if (titleErrors.length) this.errors.title = titleErrors;
	}

	renewValues (props = {}) {
		renewTopLevelValues(this, props);
		renewTopLevelValues(this.theatre, { id: props.theatre_id, name: props.theatre_name });
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
				_this.renewValues(production);

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
				renewTopLevelValues(_this, production);

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
				_this.renewValues(production);

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
