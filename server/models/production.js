import format from 'pg-format';
import query from '../../database/query';
import { newFormPageData, editFormPageData } from '../lib/page-data.js';

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

	renewValues (row) {
		for (const property in this) {
			if (this.hasOwnProperty(property) && row[property]) this[property] = row[property];
		}
	}

	new (callback) {
		const page = newFormPageData(this);
		return callback({ page, production: this });
	}

	create (callback) {
		this.validate();

		if (Object.keys(this.errors).length) {
			const page = newFormPageData(this);
			return callback(null, { page, production: this });
		}

		const data = {
			title: format.literal(this.title)
		};

		const queryData = {
			text: `INSERT INTO productions(title) VALUES(${data.title}) RETURNING *`,
			isSingleReqdResult: true
		}

		query(queryData, function (err, production) {
			if (err) return callback(err);
			return callback(null, { production });
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

			const page = editFormPageData(_this);

			return callback(null, { page, production: _this });
		});
	}

	update (callback) {
		this.validate();

		if (Object.keys(this.errors).length) {
			const page = editFormPageData(this);
			return callback(null, { page, production: this });
		}

		const data = {
			id: format.literal(this.id),
			title: format.literal(this.title)
		};

		const queryData = {
			text: `UPDATE productions SET title=${data.title} WHERE id=${data.id} RETURNING *`,
			isSingleReqdResult: true
		}

		query(queryData, function (err, production) {
			if (err) return callback(err);
			return callback(null, { production });
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

			return callback(null, { production: _this });
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

			return callback(null, { production: _this });
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
