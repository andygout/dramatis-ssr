const Production = require('../../models/production');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {
	const production = new Production(req.body);

	return production.delete()
		.then(data => {
			const redirectRoute = '/';
			handleModelResponse(req, res, data, redirectRoute);
		})
		.catch(err => next(err));
};
