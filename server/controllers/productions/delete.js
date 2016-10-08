import format from 'pg-format';
import query from '../../../lib/query';

export default function (req, res, next) {
	const id = format.literal(req.params.id);

	const queryText = `DELETE FROM productions WHERE id=${id}`;

	query(queryText, function (err) {
		if (err) return next(err);
		res.redirect('/');
	});
}
