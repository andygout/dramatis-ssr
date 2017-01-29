const Production = require('../../models/production');
const getAlert = require('../../lib/alert').get;
const getPageData = require('../../lib/get-page-data');

module.exports = function (req, res, next) {

	const production = new Production(req.params);

	return production.show()
		.then(production => {

			const page = getPageData(production, 'show');

			res.render(`${page.modelRoute}/show`, { page, production, alert: getAlert(req) });

		})
		.catch(err => next(err));

};
