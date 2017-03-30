import Production from '../models/production';
import { renderFormPage, renderShowPage, renderListPage } from '../lib/controller-helpers/render-templates';
import handleModelResponse from '../lib/handle-model-response';

const newRoute = (req, res, next) => {

	const production = new Production();

	renderFormPage(res, production, 'create');

};

const createRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.create()
		.then(({ production }) => handleModelResponse(req, res, production, 'create'))
		.catch(err => next(err));

};

const editRoute = (req, res, next) => {

	const production = new Production(req.params);

	return production.edit()
		.then(({ production }) => renderFormPage(res, production, 'update'))
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.update()
		.then(({ production }) => handleModelResponse(req, res, production, 'update'))
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const production = new Production(req.body);

	return production.delete()
		.then(({ production }) => handleModelResponse(req, res, production, 'delete'))
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const production = new Production(req.params);

	return production.show()
		.then(({ production }) => renderShowPage(req, res, production))
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Production.list()
		.then(({ productions }) => renderListPage(req, res, productions, 'productions'))
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
