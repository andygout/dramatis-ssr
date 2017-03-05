import Theatre from '../models/theatre';
import { getAlert } from '../lib/alert';
import getPageData from '../lib/get-page-data';
import handleModelResponse from '../lib/handle-model-response';

const editRoute = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.edit()
		.then(theatre => {

			const page = getPageData(theatre, 'update');

			res.render(`${page.modelRoute}/form`, { page, theatre });

		})
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.update()
		.then(theatre => {

			const page = getPageData(theatre, 'update');

			handleModelResponse(req, res, { page, theatre });

		})
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const theatre = new Theatre(req.body);

	return theatre.delete()
		.then(theatre => {

			const page = getPageData(theatre, 'delete');

			handleModelResponse(req, res, { page, theatre });

		})
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const theatre = new Theatre(req.params);

	return theatre.show()
		.then(theatre => {

			const page = getPageData(theatre, 'show');

			res.render(`${page.modelRoute}/show`, { page, theatre, alert: getAlert(req) });

		})
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Theatre.list()
		.then(theatres => {

			const pageTitle = 'Theatres';

			const page = { documentTitle: ` | ${pageTitle}`, title: pageTitle };

			res.render('theatres/list', Object.assign({ page, theatres, alert: getAlert(req) }));

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
