import express from 'express';
import methodOverride from 'method-override';
import * as controllers from '../controllers';

const router = express.Router();

router.use(methodOverride((req, res) => {

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
router.get('/productions/:uuid/edit', controllers.productions.editRoute);
router.post('/productions/:uuid', controllers.productions.updateRoute);
router.delete('/productions/:uuid', controllers.productions.deleteRoute);
router.get('/productions/:uuid', controllers.productions.showRoute);
router.get('/productions', (req, res) => res.redirect('/'));

// Theatres
router.get('/theatres/:uuid/edit', controllers.theatres.editRoute);
router.post('/theatres/:uuid', controllers.theatres.updateRoute);
router.delete('/theatres/:uuid', controllers.theatres.deleteRoute);
router.get('/theatres/:uuid', controllers.theatres.showRoute);
router.get('/theatres', controllers.theatres.listRoute);

export default router;
