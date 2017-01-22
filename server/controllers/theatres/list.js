const Theatre = require('../../models/theatre');
const getAlert = require('../../lib/alert').get;

module.exports = function (req, res, next) {
	return Theatre.list()
		.then(data => res.render('theatres/list', Object.assign(data, { alert: getAlert(req) })))
		.catch(err => next(err));
};
