import { Router } from 'express';

import {
	home as homeController,
	instances as instancesController,
	lists as listsController
} from './controllers';
import { MODELS, PLURALISED_MODELS } from './utils/constants';

const router = new Router();

router.get('/', (request, response) => homeController(response));

router.get('/awards/ceremonies', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.AWARD_CEREMONIES));

router.get('/awards/ceremonies/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.AWARD_CEREMONY));

router.get('/awards', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.AWARDS));

router.get('/awards/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.AWARD));

router.get('/characters', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.CHARACTERS));

router.get('/characters/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.CHARACTER));

router.get('/companies', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.COMPANIES));

router.get('/companies/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.COMPANY));

router.get('/materials', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.MATERIALS));

router.get('/materials/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.MATERIAL));

router.get('/people', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.PEOPLE));

router.get('/people/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.PERSON));

router.get('/productions', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.PRODUCTIONS));

router.get('/productions/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.PRODUCTION));

router.get('/venues', (request, response, next) =>
	listsController(request, response, next, PLURALISED_MODELS.VENUES));

router.get('/venues/:uuid', (request, response, next) =>
	instancesController(request, response, next, MODELS.VENUE));

router.get('*', (request, response, next) => {

	const error = new Error('Not Found');
	error.status = 404;

	return next(error);

});

export default router;
