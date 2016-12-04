const format = require('pg-format');
const query = require('../../database/query');
const constants = require('../lib/constants');
const getPageData = require('../lib/page-data.js');

module.exports = class Production {

	constructor (props = {}) {
		this.id = props.id || null;
		this.title = props.title;
		this.preEditedTitle = props.preEditedTitle;
	}

	trimStrings () {
		for (const property in this) {
			if (this.hasOwnProperty(property) && typeof this[property] === 'string') {
				this[property] = this[property].trim();
			}
		}
	}

	validateTitle () {
		const titleErrors = [];
		if (this.title.length < constants.STRING_MIN_LENGTH) titleErrors.push('Title is too short');
		if (this.title.length > constants.STRING_MAX_LENGTH) titleErrors.push('Title is too long');
		return titleErrors;
	}

	validate () {
		this.trimStrings();

		this.errors = {};

		const titleErrors = this.validateTitle();
		if (titleErrors.length) this.errors.title = titleErrors;
	}

	pgFormatValues () {
		const thisPgFormatted = this;

		for (const property in thisPgFormatted) thisPgFormatted[property] = format.literal(thisPgFormatted[property]);

		return thisPgFormatted;
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

		const page = getPageData(this, 'create');

		if (Object.keys(this.errors).length) return Promise.resolve({ page, production: this });

		const data = this.pgFormatValues();

		const queryData = {
			text: `INSERT INTO productions(title) VALUES(${data.title}) RETURNING id`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([production] = production) => ({ page, production }));
	}

	edit () {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `SELECT * FROM productions WHERE id=${id}`,
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
