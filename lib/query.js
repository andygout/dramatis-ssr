import { pool } from './pool';

export default function (queryText, callback) {
	pool.connect(function (err, client, release) {
		if (err) return callback(err);

		client.query(queryText, function (err, result) {
			release();

			if (err) return callback(err);

			const rows = result.rows.length === 1 ? result.rows[0] : result.rows;

			return callback(null, rows);
		});
	});

	pool.on('error', function (err, client) {
		console.error('Idle client error', err.message, err.stack);
	});
}
