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
router.get('/', controllers.productions.list);

// Productions
router.get('/productions/new', controllers.productions.new);
router.post('/productions', controllers.productions.create);
router.get('/productions/:id/edit', controllers.productions.edit);
router.post('/productions/:id', controllers.productions.update);
router.delete('/productions/:id', controllers.productions.delete);
router.get('/productions/:id', controllers.productions.show);
router.get('/productions', function (req, res) {
	res.redirect('/');
});

// Theatres
router.get('/theatres/:id/edit', controllers.theatres.edit);
router.post('/theatres/:id', controllers.theatres.update);
router.delete('/theatres/:id', controllers.theatres.delete);
router.get('/theatres/:id', controllers.theatres.show);
router.get('/theatres', controllers.theatres.list);

module.exports = router;
