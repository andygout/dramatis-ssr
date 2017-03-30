import Theatre from '../models/theatre';
import { renderFormPage, renderShowPage, renderListPage } from '../lib/controller-helpers/render-templates';
import handleModelResponse from '../lib/handle-model-response';

const editRoute = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.edit()
		.then(({ theatre }) => renderFormPage(res, theatre, 'update'))
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.update()
		.then(({ theatre }) => handleModelResponse(req, res, theatre, 'update'))
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.delete()
		.then(({ theatre }) => handleModelResponse(req, res, theatre, 'delete'))
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.show()
		.then(({ theatre }) => renderShowPage(req, res, theatre))
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Theatre.list()
		.then(({ theatres }) => renderListPage(req, res, theatres, 'theatres'))
		.catch(err => next(err));

};

export {
	editRoute,
	updateRoute,
	deleteRoute,
	showRoute,
	listRoute
};
