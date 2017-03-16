import Production from '../models/production';
import { getAlert } from '../lib/alert';
import getPageData from '../lib/get-page-data';
import handleModelResponse from '../lib/handle-model-response';

const newRoute = (req, res, next) => {

	const production = new Production();

	res.render(`productions/form`, {
		instance: production,
		page: getPageData(production, 'create'),
		form: true
	});

};

const createRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.create()
		.then(({ production }) => {

			handleModelResponse(req, res, production, 'create');

		})
		.catch(err => next(err));

};

const editRoute = (req, res, next) => {

	const production = new Production(req.params);

	return production.edit()
		.then(({ production }) => {

			res.render(`productions/form`, {
				instance: production,
				page: getPageData(production, 'update'),
				form: true
			});

		})
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.update()
		.then(({ production }) => {

			handleModelResponse(req, res, production, 'update');

		})
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.delete()
		.then(({ production }) => {

			handleModelResponse(req, res, production, 'delete');

		})
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const production = new Production(req.params);

	return production.show()
		.then(({ production }) => {

			res.render(`productions/show`, {
				instance: production,
				page: getPageData(production, 'show'),
				alert: getAlert(req),
				show: true
			});

		})
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Production.list()
		.then(({ productions }) => {

			res.render('productions/list', {
				instances: productions,
				page: { documentTitle: ' | Home', title: 'Productions' },
				alert: getAlert(req),
				list: true
			});

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
