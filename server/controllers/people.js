import Person from '../models/person';
import { getAlert } from '../lib/alert';
import getPageData from '../lib/get-page-data';
import handleModelResponse from '../lib/handle-model-response';

const editRoute = (req, res, next) => {

	const person = new Person(req.params);

	return person.edit()
		.then(({ person }) => {

			res.render('people/form', {
				instance: person,
				page: getPageData(person, 'update'),
				form: true
			});

		})
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const person = new Person(req.body);

	return person.update()
		.then(({ person }) => {

			handleModelResponse(req, res, person, 'update');

		})
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const person = new Person(req.body);

	return person.delete()
		.then(({ person }) => {

			handleModelResponse(req, res, person, 'delete');

		})
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const person = new Person(req.params);

	return person.show()
		.then(({ person }) => {

			res.render('people/show', {
				instance: person,
				page: getPageData(person, 'show'),
				alert: getAlert(req),
				show: true
			});

		})
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Person.list()
		.then(({ people }) => {

			const pageTitle = 'People';

			res.render('people/list', {
				instances: people,
				page: { documentTitle: ` | ${pageTitle}`, title: pageTitle },
				alert: getAlert(req),
				list: true
			});

		})
		.catch(err => next(err));

};

export {
	editRoute,
	updateRoute,
	deleteRoute,
	showRoute,
	listRoute
};
