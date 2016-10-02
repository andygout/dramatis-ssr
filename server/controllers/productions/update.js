const format = require('pg-format');
const query = require('../../../lib/query');

module.exports = (req, res, next) => {
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
};
