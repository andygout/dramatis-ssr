const Production = require('../../models/production');

module.exports = function (req, res, next) {
	const production = new Production();
	res.render('productions/form', production.new());
};
