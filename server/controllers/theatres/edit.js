const Theatre = require('../../models/theatre');
const getPageData = require('../../lib/get-page-data');

module.exports = function (req, res, next) {

	const theatre = new Theatre(req.params);

	return theatre.edit()
		.then(theatre => {

			const page = getPageData(theatre, 'update');

			res.render(`${page.modelRoute}/form`, { page, theatre });

		})
		.catch(err => next(err));

};
