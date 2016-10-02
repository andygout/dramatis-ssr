const pg = require('pg');
const path = require('path');
const connectionString = require(path.join(__dirname, '../', 'config'));

module.exports = function (queryText, callback) {
	pg.connect(connectionString, function (err, client, release) {
		if (err) return callback(err);

		client.query(queryText, function (err, result) {
			release();

			if (err) return callback(err);

			const rows = result.rows.length === 1 ? result.rows[0] : result.rows;

			return callback(null, rows);
		});
	});
};
