import format from 'pg-format';
import query from '../../lib/query';

export default class Production {

	constructor (props = {}) {
		this.id = props.id || null;
		this.title = props.title || null;
	}

	renewValues (row) {
		for (const property in this) {
			if (this.hasOwnProperty(property) && row[property]) this[property] = row[property];
		}
	}

	new (callback) {
		const page = {
			title: 'New production',
			formAction: '/productions',
			submitValue: 'Create production'
		}

		return callback({ page, production: this });
	}

	create (callback) {
		const data = {
			title: format.literal(this.title)
		};

		const queryText = `INSERT INTO productions(title) VALUES(${data.title}) RETURNING id`;

		query(queryText, function (err, productionRow) {
			if (err) return callback(err);
			return callback(null, productionRow.id);
		});
	}

	edit (callback) {
		const _this = this;

		const id = format.literal(this.id);

		const queryText = `SELECT * FROM productions WHERE id=${id}`;

		query(queryText, function (err, productionRow) {
			if (err) return callback(err);

			_this.renewValues(productionRow);

			const page = {
				title: _this.title,
				formAction: `/productions/${_this.id}`,
				submitValue: 'Update production'
			}

			return callback(null, { page, production: _this });
		});
	}

	update (callback) {
		const id = this.id;

		const data = {
			id: format.literal(this.id),
			title: format.literal(this.title)
		};

		const queryText = `UPDATE productions SET title=${data.title} WHERE id=${data.id}`;

		query(queryText, function (err) {
			if (err) return callback(err);
			return callback(null, id);
		});
	}

	delete (callback) {
		const id = format.literal(this.id);

		const queryText = `DELETE FROM productions WHERE id=${id}`;

		query(queryText, function (err) {
			if (err) return callback(err);
			return callback(null);
		});
	}

	show (callback) {
		const _this = this;

		const id = format.literal(this.id);

		const queryText = `SELECT * FROM productions WHERE id=${id}`;

		query(queryText, function (err, productionRow) {
			if (err) return callback(err);

			_this.renewValues(productionRow);

			return callback(null, { production: _this });
		});
	}


	static list (callback) {
		const queryText = 'SELECT * FROM productions ORDER BY id ASC';

		query(queryText, function (err, productionsRows) {
			if (err) return callback(err);

			const productions = productionsRows.map(productionRow => new Production(productionRow));

			return callback(null, { productions });
		});
	}

}
