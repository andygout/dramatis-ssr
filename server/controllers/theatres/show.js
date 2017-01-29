const Theatre = require('../../models/theatre');
const getAlert = require('../../lib/alert').get;
const getPageData = require('../../lib/get-page-data');

module.exports = function (req, res, next) {

	const theatre = new Theatre(req.params);

	return theatre.show()
		.then(theatre => {

			const page = getPageData(theatre, 'delete');

			res.render(`${page.modelRoute}/show`, { page, theatre, alert: getAlert(req) });

		})
		.catch(err => next(err));

};
