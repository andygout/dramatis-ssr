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
	pg.connect(connectionString, function (error, client, done) {
		if (error) return next(error);

		const query = client.query('SELECT * FROM productions ORDER BY id ASC');

		query.on('error', function(error) { return next(error); });

		query.on('row', function (row, result) { result.addRow(row); });

		query.on('end', function (result) {
			done();
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
	let production;

	const data = {
		title: format.literal(req.body.title)
	};

	pg.connect(connectionString, function (error, client, done) {
		if (error) return next(error);

		const query = client.query(`INSERT INTO productions(title) VALUES(${data.title}) RETURNING id`);

		query.on('error', function(error) { return next(error); });

		query.on('row', function (row) { production = row; });

		query.on('end', function (result) {
			done();
			res.redirect(`/productions/${production.id}`);
		});
	});
});

// Edit
router.get('/productions/:id/edit', function (req, res, next) {
	const id = format.literal(req.params.id);

	let production;

	pg.connect(connectionString, function (error, client, done) {
		if (error) return next(error);

		const query = client.query(`SELECT * FROM productions WHERE id=${id}`);

		query.on('error', function(error) { return next(error); });

		query.on('row', function (row) { production = row; });

		query.on('end', function (result) {
			done();

			const content = {
				pageTitle: result.title,
				formAction: `/productions/${production.id}`,
				submitValue: 'Update production'
			}

			res.render('form', Object.assign({}, content, production));
		});
	});
});

// Update
router.post('/productions/:id', function (req, res, next) {
	const id = req.params.id;

	const data = {
		id: 	format.literal(req.params.id),
		title: 	format.literal(req.body.title)
	};

	pg.connect(connectionString, function (error, client, done) {
		if (error) return next(error);

		const query = client.query(`UPDATE productions SET title=${data.title} WHERE id=${data.id}`);

		query.on('error', function(error) { return next(error); });

		query.on('row', function (row) { production = row; });

		query.on('end', function (result) {
			done();
			res.redirect(`/productions/${id}`);
		});
	});
});

// Delete
router.delete('/productions/:id', function (req, res, next) {
	const id = format.literal(req.params.id);

	pg.connect(connectionString, function (error, client, done) {
		if (error) return next(error);

		const query = client.query(`DELETE FROM productions WHERE id=${id}`);

		query.on('error', function(error) { return next(error); });

		query.on('end', function (result) {
			done();
			res.redirect('/');
		});
	});
});

// Show
router.get('/productions/:id', function (req, res, next) {
	const id = format.literal(req.params.id);

	let production;

	pg.connect(connectionString, function (error, client, done) {
		if (error) return next(error);

		const query = client.query(`SELECT * FROM productions WHERE id=${id}`);

		query.on('error', function(error) { return next(error); });

		query.on('row', function (row) { production = row; });

		query.on('end', function (result) {
			done();
			res.render('show', production);
		});
	});
});

// Index
router.get('/productions', function (req, res) {
	res.redirect('/');
});

module.exports = router;
