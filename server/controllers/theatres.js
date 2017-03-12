import Theatre from '../models/theatre';
import { getAlert } from '../lib/alert';
import getPageData from '../lib/get-page-data';
import handleModelResponse from '../lib/handle-model-response';

const editRoute = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.edit()
		.then(({ theatre }) => {

			res.render(`${theatre.model.toLowerCase()}s/form`, {
				theatre,
				page: getPageData(theatre, 'update')
			});

		})
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.update()
		.then(({ theatre }) => {

			handleModelResponse(req, res, theatre, 'update');

		})
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.delete()
		.then(({ theatre }) => {

			handleModelResponse(req, res, theatre, 'delete');

		})
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.show()
		.then(({ theatre }) => {

			res.render(`${theatre.model.toLowerCase()}s/show`, {
				theatre,
				page: getPageData(theatre, 'show'),
				alert: getAlert(req)
			});

		})
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Theatre.list()
		.then(({ theatres }) => {

			const pageTitle = 'Theatres';

			res.render('theatres/list', {
				theatres,
				page: { documentTitle: ` | ${pageTitle}`, title: pageTitle },
				alert: getAlert(req)
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
