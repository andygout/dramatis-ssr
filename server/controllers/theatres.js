const Theatre = require('../models/theatre');
const getAlert = require('../lib/alert').get;
const getPageData = require('../lib/get-page-data');
const handleModelResponse = require('../lib/handle-model-response');

exports.edit = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.edit()
		.then(theatre => {

			const page = getPageData(theatre, 'update');

			res.render(`${page.modelRoute}/form`, { page, theatre });

		})
		.catch(err => next(err));

};

exports.update = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.update()
		.then(theatre => {

			const page = getPageData(theatre, 'update');

			handleModelResponse(req, res, { page, theatre });

		})
		.catch(err => next(err));

};

exports.delete = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.delete()
		.then(theatre => {

			const page = getPageData(theatre, 'delete');

			handleModelResponse(req, res, { page, theatre });

		})
		.catch(err => next(err));

};

exports.show = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.show()
		.then(theatre => {

			const page = getPageData(theatre, 'delete');

			res.render(`${page.modelRoute}/show`, { page, theatre, alert: getAlert(req) });

		})
		.catch(err => next(err));

};

exports.list = (req, res, next) => {

	return Theatre.list()
		.then(theatres => {

			pageTitle = 'Theatres';

			const page = { documentTitle: ` | ${pageTitle}`, title: pageTitle };

			res.render('theatres/list', Object.assign({ page, theatres, alert: getAlert(req) }));

		})
		.catch(err => next(err));

};
