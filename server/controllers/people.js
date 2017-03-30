import Person from '../models/person';
import { renderFormPage, renderShowPage, renderListPage } from '../lib/controller-helpers/render-templates';
import handleModelResponse from '../lib/handle-model-response';

const editRoute = (req, res, next) => {

	const person = new Person(req.params);

	return person.edit()
		.then(({ person }) => renderFormPage(res, person, 'update'))
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const person = new Person(req.body);

	return person.update()
		.then(({ person }) => handleModelResponse(req, res, person, 'update'))
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const person = new Person(req.body);

	return person.delete()
		.then(({ person }) => handleModelResponse(req, res, person, 'delete'))
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const person = new Person(req.params);

	return person.show()
		.then(({ person }) => renderShowPage(req, res, person))
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Person.list()
		.then(({ people }) => renderListPage(req, res, people, 'people'))
		.catch(err => next(err));

};

export {
	editRoute,
	updateRoute,
	deleteRoute,
	showRoute,
	listRoute
};
