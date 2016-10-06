import query from '../../../lib/query';

export default function (req, res, next) {
	const queryText = 'SELECT * FROM productions ORDER BY id ASC';

	query(queryText, function (err, productions) {
		if (err) return next(err);
		res.render('index', { content: JSON.stringify(productions) });
	});
}
