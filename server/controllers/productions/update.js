const Production = require('../../models/production');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {

	const production = new Production(req.body);

	return production.update()
		.then(data => {
			const hasError = data.production.hasError || false;
			const redirectRoute = `/productions/${data.production.id}`;
			handleModelResponse(req, res, Object.assign(data, { hasError, redirectRoute }));
		})
		.catch(err => next(err));

};
