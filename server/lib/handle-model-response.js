const alert = require('./alert');

module.exports = function (req, res, data) {
	alert.set(req, data.page);

	const modelName = data.page.modelName;

	data.hasError ?
		res.render(`${modelName}s/form`, Object.assign(data, { alert: alert.get(req) })) :
		res.redirect(data.redirectRoute);
};
