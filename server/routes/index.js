const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

// Home
router.get('/', require('../controllers/productions/index'));

// Productions
router.get('/productions/new', require('../controllers/productions/new'));
router.post('/productions', require('../controllers/productions/create'));
router.get('/productions/:id/edit', require('../controllers/productions/edit'));
router.post('/productions/:id', require('../controllers/productions/update'));
router.delete('/productions/:id', require('../controllers/productions/delete'));
router.get('/productions/:id', require('../controllers/productions/show'));
router.get('/productions', require('../controllers/productions/index'));

module.exports = router;
