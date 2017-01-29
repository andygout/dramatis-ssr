const alert = require('./alert');

module.exports = function (req, res, data) {

	const page = data.page;

	alert.set(req, page);

	data[page.modelName].hasError ?
		(page.action === 'create' || page.action === 'update') ?
			res.render(`${page.modelRoute}/form`, Object.assign(data, { alert: alert.get(req) })) :
			res.redirect(`${page.instanceRoute}`)
		:
		res.redirect(page.action !== 'delete' ? `${page.instanceRoute}` : '/');

};
