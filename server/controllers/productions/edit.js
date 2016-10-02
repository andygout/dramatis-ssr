const format = require('pg-format');
const query = require('../../../lib/query');

module.exports = (req, res, next) => {
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
};
