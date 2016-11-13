import { pool } from './pool';

export default function (queryData) {
	return new Promise(function (resolve, reject) {
		pool.connect(function (err, client, release) {
			if (err) return reject(err);

			client.query(queryData.text, function (err, result) {
				release();

				if (err) return reject(err);

				if (!result.rowCount && queryData.isSingleReqdResult) {
					const err = new Error('Not Found');
					err.status = 404;
					return reject(err);
				}

				const rows = queryData.isSingleReqdResult ? result.rows[0] : result.rows;

				return resolve(rows);
			});
		});

		pool.on('error', function (err, client) {
			console.error('Idle client error', err.message, err.stack);
		});
	});
}
