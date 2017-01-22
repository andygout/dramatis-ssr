const Theatre = require('../../models/theatre');
const getAlert = require('../../lib/alert').get;

module.exports = function (req, res, next) {
	const theatre = new Theatre(req.params);

	return theatre.show()
		.then(data => res.render('theatres/show', Object.assign(data, { alert: getAlert(req) })))
		.catch(err => next(err));
};
