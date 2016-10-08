import format from 'pg-format';
import query from '../../../lib/query';

export default function (req, res, next) {
	const id = format.literal(req.params.id);

	const queryText = `SELECT * FROM productions WHERE id=${id}`;

	query(queryText, function (err, production) {
		if (err) return next(err);

		const content = {
			pageTitle: production.title,
			formAction: `/productions/${production.id}`,
			submitValue: 'Update production'
		}

		res.render('form', Object.assign({}, content, production));
	});
}
