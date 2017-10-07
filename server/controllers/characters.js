import Character from '../models/character';
import handleModelResponse from '../lib/controllers-helpers/handle-model-response';
import renderPage from '../lib/controllers-helpers/render-page';

const editRoute = (req, res, next) => {

	const character = new Character(req.params);

	return character.edit()
		.then(({ character }) => renderPage(req, res, character, 'form', { action: 'update' }))
		.catch(err => next(err));

};

const updateRoute = (req, res, next) => {

	const character = new Character(req.body);

	return character.update()
		.then(({ character }) => handleModelResponse(req, res, character, 'update'))
		.catch(err => next(err));

};

const deleteRoute = (req, res, next) => {

	const character = new Character(req.body);

	return character.delete()
		.then(({ character }) => handleModelResponse(req, res, character, 'delete'))
		.catch(err => next(err));

};

const showRoute = (req, res, next) => {

	const character = new Character(req.params);

	return character.show()
		.then(({ character }) => renderPage(req, res, character, 'show'))
		.catch(err => next(err));

};

const listRoute = (req, res, next) => {

	return Character.list('character')
		.then(({ characters }) => renderPage(req, res, characters, 'list', { pluralisedModel: 'characters' }))
		.catch(err => next(err));

};

export {
	editRoute,
	updateRoute,
	deleteRoute,
	showRoute,
	listRoute
};
