const express = require('express');
const router = express.Router();
const path = require('path');
const pg = require('pg');
const connectionString = require(path.join(__dirname, '../', '../', 'config'));
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
	pg.connect(connectionString, function (err, client, done) {
		if (err) return next(err);

		client.query('SELECT * FROM productions ORDER BY id ASC', function (err, result) {
			done();
			if (err) return next(err);
			res.render('index', { content: JSON.stringify(result.rows) });
		});
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

	pg.connect(connectionString, function (err, client, done) {
		if (err) return next(err);

		client.query(`INSERT INTO productions(title) VALUES(${data.title}) RETURNING id`, function (err, result) {
			done();
			if (err) return next(err);
			res.redirect(`/productions/${result.rows[0].id}`);
		});
	});
});

// Edit
router.get('/productions/:id/edit', function (req, res, next) {
	const id = format.literal(req.params.id);

	pg.connect(connectionString, function (err, client, done) {
		if (err) return next(err);

		client.query(`SELECT * FROM productions WHERE id=${id}`, function (err, result) {
			done();
			if (err) return next(err);

			const content = {
				pageTitle: result.title,
				formAction: `/productions/${result.rows[0].id}`,
				submitValue: 'Update production'
			}

			res.render('form', Object.assign({}, content, result.rows[0]));
		});
	});
});

// Update
router.post('/productions/:id', function (req, res, next) {
	const id = req.params.id;

			console.log('*********');
			console.log('req.params ***: ', req.params);
	const data = {
		id: 	format.literal(req.params.id),
		title: 	format.literal(req.body.title)
	};

	pg.connect(connectionString, function (err, client, done) {
		if (err) return next(err);

		client.query(`UPDATE productions SET title=${data.title} WHERE id=${data.id}`, function (err, result) {
			done();
			if (err) return next(err);
			res.redirect(`/productions/${id}`);
		});
	});
});

// Delete
router.delete('/productions/:id', function (req, res, next) {
	const id = format.literal(req.params.id);

	pg.connect(connectionString, function (err, client, done) {
		if (err) return next(err);

		client.query(`DELETE FROM productions WHERE id=${id}`, function (err, result) {
			done();
			if (err) return next(err);
			res.redirect('/');
		});
	});
});

// Show
router.get('/productions/:id', function (req, res, next) {
	const id = format.literal(req.params.id);

	pg.connect(connectionString, function (err, client, done) {
		if (err) return next(err);

		client.query(`SELECT * FROM productions WHERE id=${id}`, function (err, result) {
			done();
			if (err) return next(err);
			res.render('show', result.rows[0]);
		});
	});
});

// Index
router.get('/productions', function (req, res) {
	res.redirect('/');
});

module.exports = router;
