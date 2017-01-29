const Production = require('../../models/production');
const getPageData = require('../../lib/get-page-data');

module.exports = function (req, res, next) {

	const production = new Production();

	const page = getPageData(production, 'create');

	res.render(`${page.modelRoute}/form`, { page, production });

};
