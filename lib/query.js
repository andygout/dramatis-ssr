const pg = require('pg');
const path = require('path');
const connectionString = require(path.join(__dirname, '../', 'config'));

module.exports = function (queryText, callback) {
	pg.connect(connectionString, function (error, client, release) {
		if(error) return callback(error);

		client.query(queryText, function (error, result) {
			release();

			if(error) return callback(error);

			const rows = result.rows.length === 1 ? result.rows[0] : result.rows;

			return callback(null, rows);
		});
	});
};
