import Production from '../models/production';
import { getAlert } from '../lib/alert';
import getPageData from '../lib/get-page-data';
import handleModelResponse from '../lib/handle-model-response';

const newRoute = (req, res, next) => {

	const production = new Production();

	const page = getPageData(production, 'create');

	res.render(`${page.modelRoute}/form`, { page, production });

};

const createRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.create()
		.then(({ production }) => {

			const page = getPageData(production, 'create');

			handleModelResponse(req, res, { page, production });

		})
		.catch(err => next(err));

};

const editRoute = (req, res, next) => {

	const production = new Production(req.params);

	return production.edit()
		.then(({ production }) => {

			const page = getPageData(production, 'update');

			res.render(`${page.modelRoute}/form`, { page, production });

		})
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.update()
		.then(({ production }) => {

			const page = getPageData(production, 'update');

			handleModelResponse(req, res, { page, production });

		})
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.delete()
		.then(({ production }) => {

			const page = getPageData(production, 'delete');

			handleModelResponse(req, res, { page, production });

		})
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const production = new Production(req.params);

	return production.show()
		.then(({ production }) => {

			const page = getPageData(production, 'show');

			res.render(`${page.modelRoute}/show`, { page, production, alert: getAlert(req) });

		})
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Production.list()
		.then(({ productions }) => {

			const page = { documentTitle: ' | Home', title: 'Productions' };

			res.render('productions/list', Object.assign({ page, productions, alert: getAlert(req) }));

		})
		.catch(err => next(err));

};

export {
	newRoute,
	createRoute,
	editRoute,
	updateRoute,
	deleteRoute,
	showRoute,
	listRoute
};
