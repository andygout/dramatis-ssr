const Production = require('../../models/production');
const getPageData = require('../../lib/get-page-data');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {

	const production = new Production(req.body);

	return production.update()
		.then(production => {

			const page = getPageData(production, 'update');

			handleModelResponse(req, res, { page, production });

		})
		.catch(err => next(err));

};
