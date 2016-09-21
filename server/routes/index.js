const express = require('express');
const router = express.Router();
const path = require('path');
const pg = require('pg');
const connectionString = require(path.join(__dirname, '../', '../', 'config'));

const handleConnectionErrors = (err, done, res) => {
	// Handle connection errors
	if(err) {
		done();
		console.log(err);
		return res.status(500).json({ success: false, data: err });
	}
}

// Home
router.get('/', function (req, res, next) {
	const results = [];

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Select Data
		const query = client.query(`SELECT * FROM productions ORDER BY id ASC`);

		// Stream results back one row at a time
		query.on('row', function (row) {
			results.push(row);
		});

		// After all data is returned, close connection and return results
		query.on('end', function () {
			done();
			res.render('index', { content: JSON.stringify(results) });
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
router.post('/productions', function (req, res) {
	let result = {};

	// Grab data from http request
	const data = { title: req.body.title };

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Insert Data
		const query = client.query(`INSERT INTO productions(title) VALUES('${data.title}') RETURNING id`);

		// Set result as returned row
		query.on('row', function (row) {
			result = row;
		});

		// After all data is returned, close connection and return results
		query.on('end', function () {
			done();
			res.redirect(`/productions/${result.id}`);
		});
	});
});

// Edit
router.get('/productions/:production_id/edit', function (req, res) {
	let result = {};

	// Grab data from the URL parameters
	const id = req.params.production_id;

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Select Data
		const query = client.query(`SELECT * FROM productions WHERE id=${id}`);

		// Set result as returned row
		query.on('row', function (row) {
			result = row;
		});

		// After all data is returned, close connection and return results
		query.on('end', function () {
			done();

			const content = {
				pageTitle: result.title,
				formAction: `/productions/${result.id}`,
				submitValue: 'Update production'
			}

			res.render('form', Object.assign({}, content, result));
		});
	});
});

// Update
router.post('/productions/:production_id', function (req, res) {
	// Grab data from the URL parameters
	const id = req.params.production_id;

	// Grab data from http request
	const data = { title: req.body.title };

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Update Data
		client.query(`UPDATE productions SET title='${data.title}' WHERE id=${id}`);

		res.redirect(`/productions/${id}`);
	});
});

// Delete
router.delete('/productions/:production_id', function (req, res) {
	// Grab data from the URL parameters
	const id = req.params.production_id;

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Delete Data
		client.query(`DELETE FROM productions WHERE id=${id}`);

		res.render('index', { content: 'home page' });
	});
});

// Show
router.get('/productions/:production_id', function (req, res) {
	let result = {};

	// Grab data from the URL parameters
	const id = req.params.production_id;

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Select Data
		const query = client.query(`SELECT * FROM productions WHERE id=${id}`);

		// Set result as returned row
		query.on('row', function (row) {
			result = row;
		});

		// After all data is returned, close connection and return results
		query.on('end', function () {
			done();
			res.render('show', result);
		});
	});
});

// Index
router.get('/productions', function (req, res) {
	res.redirect('/');
});

module.exports = router;
