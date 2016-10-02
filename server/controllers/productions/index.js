const query = require('../../../lib/query');

module.exports = (req, res, next) => {
	const queryText = 'SELECT * FROM productions ORDER BY id ASC';

	query(queryText, function (err, productions) {
		if (err) return next(err);
		res.render('index', { content: JSON.stringify(productions) });
	});
};
