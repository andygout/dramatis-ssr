import format from 'pg-format';
import query from '../../database/query';
import { getPageData } from '../lib/page-data.js';

export default class Production {

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
		if (!this.title.length) titleErrors.push('Title is too short');
		if (this.title.length > 255) titleErrors.push('Title is too long');
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
		for (const property in this) {
			if (this.hasOwnProperty(property) && row[property]) this[property] = row[property];
		}
	}

	new (callback) {
		const page = getPageData(this, 'create');
		return callback({ page, production: this });
	}

	create (callback) {
		this.validate();

		const page = getPageData(this, 'create');

		if (Object.keys(this.errors).length) return callback(null, { page, production: this });

		const data = this.pgFormatValues();

		const queryData = {
			text: `INSERT INTO productions(title) VALUES(${data.title}) RETURNING id`,
			isSingleReqdResult: true
		}

		query(queryData, function (err, production) {
			if (err) return callback(err);
			return callback(null, { page, production });
		});
	}

	edit (callback) {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `SELECT * FROM productions WHERE id=${id}`,
			isSingleReqdResult: true
		}

		query(queryData, function (err, production) {
			if (err) return callback(err);

			_this.renewValues(production);

			const page = getPageData(_this, 'update');

			return callback(null, { page, production: _this });
		});
	}

	update (callback) {
		this.validate();

		const page = getPageData(this, 'update');

		if (Object.keys(this.errors).length) return callback(null, { page, production: this });

		const data = this.pgFormatValues();

		const queryData = {
			text: `UPDATE productions SET title=${data.title} WHERE id=${data.id} RETURNING id`,
			isSingleReqdResult: true
		}

		query(queryData, function (err, production) {
			if (err) return callback(err);
			return callback(null, { page, production });
		});
	}

	delete (callback) {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `DELETE FROM productions WHERE id=${id} RETURNING title`,
			isSingleReqdResult: true
		}

		query(queryData, function (err, production) {
			if (err) return callback(err);

			_this.renewValues(production);

			const page = getPageData(_this, 'delete');

			return callback(null, { page, production: _this });
		});
	}

	show (callback) {
		const _this = this;

		const id = format.literal(this.id);

		const queryData = {
			text: `SELECT * FROM productions WHERE id=${id}`,
			isSingleReqdResult: true
		}

		query(queryData, function (err, production) {
			if (err) return callback(err);

			_this.renewValues(production);

			const page = getPageData(_this, 'show');

			return callback(null, { page, production: _this });
		});
	}

	static list (callback) {
		const text = 'SELECT * FROM productions ORDER BY id ASC';

		query({ text }, function (err, productionsRows) {
			if (err) return callback(err);

			const productions = productionsRows.map(production => new Production(production));

			return callback(null, { productions });
		});
	}

}
