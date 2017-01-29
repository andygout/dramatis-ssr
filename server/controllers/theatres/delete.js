const Theatre = require('../../models/theatre');
const getPageData = require('../../lib/get-page-data');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {

	const theatre = new Theatre(req.body);

	return theatre.delete()
		.then(theatre => {

			const page = getPageData(theatre, 'delete');

			handleModelResponse(req, res, { page, theatre });

		})
		.catch(err => next(err));

};
