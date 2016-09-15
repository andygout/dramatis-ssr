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
	res.render('index', { content: 'home page' });
});

// New

// Create
router.post('/productions', function (req, res) {
	// Grab data from http request
	const data = { title: req.body.title };

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Insert Data
		client.query(`INSERT INTO productions(title) VALUES('${data.title}')`);

		res.render('index', { content: 'home page' });
	});
});

// Edit

// Update
router.put('/productions/:production_id', function (req, res) {
	// Grab data from the URL parameters
	const id = req.params.production_id;

	// Grab data from http request
	const data = { title: req.body.title };

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function (err, client, done) {
		handleConnectionErrors(err, res, done);

		// SQL Query > Update Data
		client.query(`UPDATE productions SET title='${data.title}' WHERE id=${id}`);

		res.render('index', { content: 'home page' });
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

		// Stream results back one row at a time
		query.on('row', function (row) {
			result = row;
			// results.push(row);
		});

		// After all data is returned, close connection and return results
		query.on('end', function () {
			done();
			res.render('index', { content: JSON.stringify(result) });
		});
	});
});

// Index
router.get('/productions', function (req, res) {
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

module.exports = router;
