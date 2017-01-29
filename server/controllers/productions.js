const Production = require('../models/production');
const getAlert = require('../lib/alert').get;
const getPageData = require('../lib/get-page-data');
const handleModelResponse = require('../lib/handle-model-response');

exports.new = (req, res, next) => {

	const production = new Production();

	const page = getPageData(production, 'create');

	res.render(`${page.modelRoute}/form`, { page, production });

};

exports.create = (req, res, next) => {

	const production = new Production(req.body);

	return production.create()
		.then(production => {

			const page = getPageData(production, 'create');

			handleModelResponse(req, res, { page, production });

		})
		.catch(err => next(err));

};

exports.edit = (req, res, next) => {

	const production = new Production(req.params);

	return production.edit()
		.then(production => {

			const page = getPageData(production, 'update');

			res.render(`${page.modelRoute}/form`, { page, production });

		})
		.catch(err => next(err));

};

exports.update = (req, res, next) => {

	const production = new Production(req.body);

	return production.update()
		.then(production => {

			const page = getPageData(production, 'update');

			handleModelResponse(req, res, { page, production });

		})
		.catch(err => next(err));

};

exports.delete = (req, res, next) => {

	const production = new Production(req.body);

	return production.delete()
		.then(production => {

			const page = getPageData(production, 'delete');

			handleModelResponse(req, res, { page, production });

		})
		.catch(err => next(err));

};

exports.show = (req, res, next) => {

	const production = new Production(req.params);

	return production.show()
		.then(production => {

			const page = getPageData(production, 'show');

			res.render(`${page.modelRoute}/show`, { page, production, alert: getAlert(req) });

		})
		.catch(err => next(err));

};

exports.list = (req, res, next) => {

	return Production.list()
		.then(productions => {

			const page = { documentTitle: ' | Home', title: 'Productions' };

			res.render('productions/list', Object.assign({ page, productions, alert: getAlert(req) }));

		})
		.catch(err => next(err));

};
