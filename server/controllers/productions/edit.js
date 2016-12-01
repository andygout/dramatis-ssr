const Production = require('../../models/production');

module.exports = function (req, res, next) {
	const production = new Production(req.params);

	production.edit()
		.then(data => res.render('form', data))
		.catch(err => next(err));
};
