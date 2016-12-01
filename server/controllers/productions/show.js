const Production = require('../../models/production');
const getAlert = require('../../lib/alert').get;

module.exports = function (req, res, next) {
	const production = new Production(req.params);

	production.show()
		.then(data => res.render('show', Object.assign({}, data, { alert: getAlert(req) })))
		.catch(err => next(err));
};
