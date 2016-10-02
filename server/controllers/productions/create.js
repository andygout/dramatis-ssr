const format = require('pg-format');
const query = require('../../../lib/query');

module.exports = (req, res, next) => {
	const data = {
		title: format.literal(req.body.title)
	};

	const queryText = `INSERT INTO productions(title) VALUES(${data.title}) RETURNING id`;

	query(queryText, function (err, production) {
		if (err) return next(err);
		res.redirect(`/productions/${production.id}`);
	});
};
