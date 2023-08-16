import { Router } from 'express';

import {
	home as homeController,
	instances as instancesController,
	lists as listsController
} from './controllers';
import { PLURALISED_MODELS } from './utils/constants';

const router = new Router();

router.get('/', (request, response) => homeController(response));

router.get('/awards', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.AWARDS));

router.get('/awards/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/award-ceremonies', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.AWARD_CEREMONIES));

router.get('/award-ceremonies/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/characters', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.CHARACTERS));

router.get('/characters/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/companies', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.COMPANIES));

router.get('/companies/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/materials', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.MATERIALS));

router.get('/materials/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/people', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.PEOPLE));

router.get('/people/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/productions', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.PRODUCTIONS));

router.get('/productions/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/seasons', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.SEASONS));

router.get('/seasons/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('/venues', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.VENUES));

router.get('/venues/:uuid', (request, response, next) =>
	instancesController(request, response, next));

router.get('*', (request, response, next) => {

	const error = new Error('Not Found');
	error.status = 404;

	return next(error);

});

export default router;
