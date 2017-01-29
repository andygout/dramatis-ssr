const Production = require('../../models/production');
const getAlert = require('../../lib/alert').get;

module.exports = function (req, res, next) {

	return Production.list()
		.then(productions => {

			const page = { title: 'Productions' };

			res.render('productions/list', Object.assign({ page, productions, alert: getAlert(req) }));

		})
		.catch(err => next(err));

};
