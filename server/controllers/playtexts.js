import Playtext from '../models/playtext';
import handleModelResponse from '../lib/controllers-helpers/handle-model-response';
import renderPage from '../lib/controllers-helpers/render-page';

const editRoute = (req, res, next) => {

	const playtext = new Playtext(req.params);

	return playtext.edit()
		.then(({ playtext }) => renderPage(req, res, playtext, 'form', { action: 'update' }))
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const playtext = new Playtext(req.body);

	return playtext.update()
		.then(({ playtext }) => handleModelResponse(req, res, playtext, 'update'))
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const playtext = new Playtext(req.body);

	return playtext.delete()
		.then(({ playtext }) => handleModelResponse(req, res, playtext, 'delete'))
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const playtext = new Playtext(req.params);

	return playtext.show()
		.then(({ playtext }) => renderPage(req, res, playtext, 'show'))
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Playtext.list()
		.then(({ playtexts }) => renderPage(req, res, playtexts, 'list', { pluralisedModel: 'playtexts' }))
		.catch(err => next(err));

};

export {
	editRoute,
	updateRoute,
	deleteRoute,
	showRoute,
	listRoute
};
