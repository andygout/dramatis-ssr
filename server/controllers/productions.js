import Production from '../models/production';
import handleModelResponse from '../lib/controllers-helpers/handle-model-response';
import renderPage from '../lib/controllers-helpers/render-page';

const newRoute = (req, res, next) => {

	const production = new Production();

	renderPage(req, res, production, 'form', { action: 'create' });

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
		.then(({ production }) => renderPage(req, res, production, 'form', { action: 'update' }))
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
		.then(({ production }) => renderPage(req, res, production, 'show'))
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Production.list()
		.then(({ productions }) => renderPage(req, res, productions, 'list', { pluralisedModel: 'productions' }))
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
