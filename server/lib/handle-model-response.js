const alert = require('./alert');

module.exports = function (req, res, data, redirectRoute) {
	alert.set(req, data.page);

	(data.production && data.production.errors) || (data.theatre && data.theatre.errors) ?
		res.render('form', Object.assign(data, { alert: alert.get(req) })) :
		res.redirect(redirectRoute);
};
