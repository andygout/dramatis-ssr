import { Router } from 'express';

import {
	home as homeController,
	instances as instancesController,
	lists as listsController
} from './controllers';

const router = new Router();

router.get('/', (request, response) => homeController(response));
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
router.get('/theatres', (request, response, next) => listsController(request, response, next));
router.get('/theatres/:uuid', (request, response, next) => instancesController(request, response, next));

router.get('*', (request, response, next) => {

	const error = new Error('Not Found');
	error.status = 404;

	return next(error);

});

export default router;
