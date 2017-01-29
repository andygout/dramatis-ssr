const Theatre = require('../../models/theatre');
const getAlert = require('../../lib/alert').get;

module.exports = function (req, res, next) {

	return Theatre.list()
		.then(theatres => {

			const page = { title: 'Theatres' };

			res.render('theatres/list', Object.assign({ page, theatres, alert: getAlert(req) }));

		})
		.catch(err => next(err));

};
