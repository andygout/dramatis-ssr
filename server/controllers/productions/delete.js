const format = require('pg-format');
const query = require('../../../lib/query');

module.exports = (req, res, next) => {
	const id = format.literal(req.params.id);

	const queryText = `DELETE FROM productions WHERE id=${id}`;

	query(queryText, function (err) {
		if (err) return next(err);
		res.redirect('/');
	});
};
