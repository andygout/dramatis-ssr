import Person from '../models/person';
import handleModelResponse from '../lib/controller-helpers/handle-model-response';
import renderPage from '../lib/controller-helpers/render-page';

const editRoute = (req, res, next) => {

	const person = new Person(req.params);

	return person.edit()
		.then(({ person }) => renderPage(req, res, person, 'form', { action: 'update' }))
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
		.then(({ person }) => renderPage(req, res, person, 'show'))
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Person.list()
		.then(({ people }) => renderPage(req, res, people, 'list', { pluralisedModel: 'people' }))
		.catch(err => next(err));

};

export {
	editRoute,
	updateRoute,
	deleteRoute,
	showRoute,
	listRoute
};
