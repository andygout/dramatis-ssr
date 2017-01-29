const Theatre = require('../../models/theatre');
const getPageData = require('../../lib/get-page-data');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {

	const theatre = new Theatre(req.body);

	return theatre.update()
		.then(theatre => {

			const page = getPageData(theatre, 'update');

			handleModelResponse(req, res, { page, theatre });

		})
		.catch(err => next(err));

};
