const format = require('pg-format');
const query = require('../../../lib/query');

module.exports = (req, res, next) => {
	const id = format.literal(req.params.id);

	const queryText = `SELECT * FROM productions WHERE id=${id}`;

	query(queryText, function (err, production) {
		if (err) return next(err);
		res.render('show', production);
	});
};
