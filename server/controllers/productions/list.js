const Production = require('../../models/production');
const handleModelResponse = require('../../lib/handle-model-response');
const getAlert = require('../../lib/alert').get;

module.exports = function (req, res, next) {
	return Production.list()
		.then(data => res.render('list', Object.assign(data, { alert: getAlert(req) })))
		.catch(err => next(err));
};
