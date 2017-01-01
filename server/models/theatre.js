const format = require('pg-format');
const query = require('../../database/query');
const constants = require('../lib/constants');
const getPageData = require('../lib/page-data');
const pgFormatValues = require('../lib/pg-format-values');
const trimStrings = require('../lib/trim-strings');
const verifyErrorPresence = require('../lib/verify-error-presence');

module.exports = class Theatre {

	constructor (props = {}) {
		this.id = props.id || null;
		this.name = props.name;
		this.preEditedName = props.preEditedName;
	}

	validateName () {
		const nameErrors = [];
		if (this.name.length < constants.STRING_MIN_LENGTH) nameErrors.push('Name is too short');
		if (this.name.length > constants.STRING_MAX_LENGTH) nameErrors.push('Name is too long');
		return nameErrors;
	}

	validate () {
		trimStrings(this);

		this.errors = {};

		const nameErrors = this.validateName();
		if (nameErrors.length) this.errors.name = nameErrors;
	}

	renewValues (row) {
		for (const property in this) if (this.hasOwnProperty(property) && row[property]) this[property] = row[property];
	}

	new () {
		const page = getPageData(this, 'create');
		return { page, theatre: this };
	}

	create () {
		this.validate();

		this.hasError = verifyErrorPresence(this);

		const page = getPageData(this, 'create');

		if (this.hasError) return Promise.resolve({ page, theatre: this });

		const data = pgFormatValues(this);

		const queryData = {
			text: `INSERT INTO theatres(name) VALUES(${data.name}) RETURNING id`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([theatre] = theatre) => ({ page, theatre }));
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
				_this.renewValues(theatre);

				const page = getPageData(_this, 'update');

				return { page, theatre: _this };
			});
	}

	update () {
		this.validate();

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
				_this.renewValues(theatre);

				const page = getPageData(_this, 'delete');

				return { page, theatre: _this };
			});
	}

	show () {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `SELECT * FROM theatres WHERE id=${id}`,
			isReqdResult: true
		}

		return query(queryData)
			.then(([theatre] = theatre) => {
				_this.renewValues(theatre);

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
