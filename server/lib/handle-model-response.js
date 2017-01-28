const alert = require('./alert');

module.exports = function (req, res, data) {

	alert.set(req, data.page);

	const action = data.page.action;
	const modelName = data.page.modelName;

	data.hasError ?
		(action === 'create' || action === 'update') ?
			res.render(`${modelName}s/form`, Object.assign(data, { alert: alert.get(req) })) :
			res.redirect(data[modelName].id)
		:
		res.redirect(data.redirectRoute);

};
