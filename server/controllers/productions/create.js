const Production = require('../../models/production');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {
	const production = new Production(req.body);

	production.create()
		.then(data => {
			const redirectRoute = `/productions/${data.production.id}`;
			handleModelResponse(req, res, data, redirectRoute);
		})
		.catch(err => next(err));
};
