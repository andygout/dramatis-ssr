import express from 'express';
import methodOverride from 'method-override';
import * as controllers from '../controllers';

const router = express.Router();

router.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

// Home
router.get('/', controllers.productions.listRoute);

// Productions
router.get('/productions/new', controllers.productions.newRoute);
router.post('/productions', controllers.productions.createRoute);
router.get('/productions/:id/edit', controllers.productions.editRoute);
router.post('/productions/:id', controllers.productions.updateRoute);
router.delete('/productions/:id', controllers.productions.deleteRoute);
router.get('/productions/:id', controllers.productions.showRoute);
router.get('/productions', controllers.productions.listRoute);

export { router };
