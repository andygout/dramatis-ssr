const Production = require('../../models/production');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {

	const production = new Production(req.body);

	return production.create()
		.then(data => {
			handleModelResponse(req, res, data);
		})
		.catch(err => next(err));

};
