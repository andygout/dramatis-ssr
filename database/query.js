import { pool } from './pool';

export default function (queryData, callback) {
	pool.connect(function (err, client, release) {
		if (err) return callback(err);

		client.query(queryData.text, function (err, result) {
			release();

			if (err) return callback(err);

			if (!result.rowCount && queryData.isSingleReqdResult) {
				const err = new Error('Not Found');
				err.status = 404;
				return callback(err);
			}

			const rows = queryData.isSingleReqdResult ? result.rows[0] : result.rows;

			return callback(null, rows);
		});
	});

	pool.on('error', function (err, client) {
		console.error('Idle client error', err.message, err.stack);
	});
}
