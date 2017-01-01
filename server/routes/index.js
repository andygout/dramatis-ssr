const express = require('express');
const methodOverride = require('method-override');
const controllers = require('../controllers');

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
router.get('/productions', function (req, res) {
	res.redirect('/');
});

// Theatres
router.get('/theatres/new', controllers.theatres.newRoute);
router.get('/theatres/:id/edit', controllers.theatres.editRoute);
router.post('/theatres/:id', controllers.theatres.updateRoute);
router.delete('/theatres/:id', controllers.theatres.deleteRoute);
router.get('/theatres/:id', controllers.theatres.showRoute);
router.get('/theatres', controllers.theatres.listRoute);

module.exports = router;
