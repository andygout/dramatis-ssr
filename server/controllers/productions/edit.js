const Production = require('../../models/production');
const getPageData = require('../../lib/get-page-data');

module.exports = function (req, res, next) {

	const production = new Production(req.params);

	return production.edit()
		.then(production => {

			const page = getPageData(production, 'update');

			res.render(`${page.modelRoute}/form`, { page, production });

		})
		.catch(err => next(err));

};
