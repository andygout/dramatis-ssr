const Production = require('../../models/production');

module.exports = function (req, res, next) {

	const production = new Production(req.params);

	return production.edit()
		.then(data => res.render('productions/form', data))
		.catch(err => next(err));

};
