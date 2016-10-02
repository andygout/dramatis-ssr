const express = require('express');
const router = express.Router();
const query = require('../../lib/query');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const format = require('pg-format');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}))

// Home
router.get('/', function (req, res, next) {
	const queryText = 'SELECT * FROM productions ORDER BY id ASC';

	query(queryText, function (err, productions) {
		if (err) return next(err);
		res.render('index', { content: JSON.stringify(productions) });
	});
});

// New
router.get('/productions/new', function (req, res) {
	const content = {
		pageTitle: 'New production',
		formAction: '/productions',
		submitValue: 'Create production'
	}

	res.render('form', content);
});

// Create
router.post('/productions', function (req, res, next) {
	const data = {
		title: format.literal(req.body.title)
	};

	const queryText = `INSERT INTO productions(title) VALUES(${data.title}) RETURNING id`;

	query(queryText, function (err, production) {
		if (err) return next(err);
		res.redirect(`/productions/${production.id}`);
	});
});

// Edit
router.get('/productions/:id/edit', function (req, res, next) {
	const id = format.literal(req.params.id);

	const queryText = `SELECT * FROM productions WHERE id=${id}`;

	query(queryText, function (err, production) {
		if (err) return next(err);

		const content = {
			pageTitle: production.title,
			formAction: `/productions/${production.id}`,
			submitValue: 'Update production'
		}

		res.render('form', Object.assign({}, content, production));
	});
});

// Update
router.post('/productions/:id', function (req, res, next) {
	const id = req.params.id;

	const data = {
		id: 	format.literal(req.params.id),
		title: 	format.literal(req.body.title)
	};

	const queryText = `UPDATE productions SET title=${data.title} WHERE id=${data.id}`;

	query(queryText, function (err) {
		if (err) return next(err);
		res.redirect(`/productions/${id}`);
	});
});

// Delete
router.delete('/productions/:id', function (req, res, next) {
	const id = format.literal(req.params.id);

	const queryText = `DELETE FROM productions WHERE id=${id}`;

	query(queryText, function (err) {
		if (err) return next(err);
		res.redirect('/');
	});
});

// Show
router.get('/productions/:id', function (req, res, next) {
	const id = format.literal(req.params.id);

	const queryText = `SELECT * FROM productions WHERE id=${id}`;

	query(queryText, function (err, production) {
		if (err) return next(err);
		res.render('show', production);
	});
});

// Index
router.get('/productions', function (req, res) {
	res.redirect('/');
});

module.exports = router;
