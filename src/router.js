import { Router } from 'express';

import {
	home as homeController,
	instances as instancesController,
	lists as listsController
} from './controllers';

const router = new Router();

router.get('/', (request, response) => homeController(response));
router.get('/awards/ceremonies', (request, response, next) => listsController(request, response, next));
router.get('/awards/ceremonies/:uuid', (request, response, next) => instancesController(request, response, next));
router.get('/awards', (request, response, next) => listsController(request, response, next));
router.get('/awards/:uuid', (request, response, next) => instancesController(request, response, next));
router.get('/characters', (request, response, next) => listsController(request, response, next));
router.get('/characters/:uuid', (request, response, next) => instancesController(request, response, next));
router.get('/companies', (request, response, next) => listsController(request, response, next));
router.get('/companies/:uuid', (request, response, next) => instancesController(request, response, next));
router.get('/materials', (request, response, next) => listsController(request, response, next));
router.get('/materials/:uuid', (request, response, next) => instancesController(request, response, next));
router.get('/people', (request, response, next) => listsController(request, response, next));
router.get('/people/:uuid', (request, response, next) => instancesController(request, response, next));
router.get('/productions', (request, response, next) => listsController(request, response, next));
router.get('/productions/:uuid', (request, response, next) => instancesController(request, response, next));
router.get('/venues', (request, response, next) => listsController(request, response, next));
router.get('/venues/:uuid', (request, response, next) => instancesController(request, response, next));

router.get('*', (request, response, next) => {

	const error = new Error('Not Found');
	error.status = 404;

	return next(error);

});

export default router;
