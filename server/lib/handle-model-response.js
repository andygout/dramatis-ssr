const alert = require('./alert');

module.exports = function (req, res, data) {

	alert.set(req, data.page);

	const action = data.page.action;
	const modelName = data.page.modelName;

	data[modelName].hasError ?
		(action === 'create' || action === 'update') ?
			res.render(`${modelName}s/form`, Object.assign(data, { alert: alert.get(req) })) :
			res.redirect(`/${modelName}s/${data[modelName].id}`)
		:
		res.redirect(action !== 'delete' ? `/${modelName}s/${data[modelName].id}` : '/');

};
