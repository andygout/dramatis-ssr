const pg = require('pg');
const path = require('path');
const connectionString = require(path.join(__dirname, '../', 'config'));

module.exports = function (queryText, callback) {
	pg.connect(connectionString, function (error, client, release) {
		if(error) return callback(error);

		client.query(queryText, function (error, result) {
			release();

			if(error) return callback(error);

			return callback(null, result.rows, result);
		});
	});
};
