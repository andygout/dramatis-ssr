const alert = require('./alert');

module.exports = function (req, res, data) {
	alert.set(req, data.page);

	data.hasError ?
		res.render('form', Object.assign(data, { alert: alert.get(req) })) :
		res.redirect(data.redirectRoute);
};
