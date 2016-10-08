import format from 'pg-format';
import query from '../../../lib/query';

export default function (req, res, next) {
	const id = req.params.id;

	const data = {
		id: 	format.literal(req.params.id),
		title: 	format.literal(req.body.title)
	};

	const queryText = `UPDATE productions SET title=${data.title} WHERE id=${data.id}`;

	query(queryText, function (err) {
		if (err) return next(err);
		res.redirect(`/productions/${id}`);
	});
}
