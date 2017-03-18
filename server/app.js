import _ from './dotenv';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import express from 'express';
import Handlebars from 'handlebars';
import favicon from 'serve-favicon';
import flash from 'connect-flash';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import session from 'express-session';

import createConstraints from './database/create-constraints';
import * as handlebarsHelpers from './lib/handlebars-helpers';
import router from './routes';

const app = express();

Handlebars.registerHelper(handlebarsHelpers);
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.html' });
app.engine('html', hbs.engine);

app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(path.join(__dirname, '../', 'client', 'favicons', 'favicon.ico')));

app.use(logger('dev'));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(flash());

app.use(
	sassMiddleware({
		src: path.join(__dirname, '../', 'client', 'stylesheets'),
		dest: path.join(__dirname, '../', 'client', 'public'),
		prefix: '/stylesheets',
		debug: true
	})
);

app.use(express.static(path.join(__dirname, '../', 'client', 'public')));
app.use(express.static(path.join(__dirname, '../', 'client', 'javascripts')));

app.use('/', router);

// Catch 404 and forward to error handler
app.use((req, res, next) => {

	const err = new Error('Not Found');

	err.status = 404;

	next(err);

});

// Error handlers
// Development error handler - will print stacktrace
if (app.get('env') === 'development') {

	app.use((err, req, res, next) => {

		console.log(err);

		const errStatus = err.status || 500;

		const errMsg = `${errStatus} Error: ${err.message}`;

		res.status(errStatus);

		res.render('partials/templates/error', {
			page: { title: errMsg },
			message: errMsg,
			error: err
		});

	});

}

// Production error handler - no stacktraces leaked to user
app.use((err, req, res, next) => {

	const errStatus = err.status || 500;

	const errMsg = `${errStatus} Error: ${err.message}`;

	res.status(errStatus);

	res.render('partials/templates/error', {
		page: { title: errMsg },
		message: errMsg,
		error: {}
	});

});

const normalizePort = val => {

	const port = parseInt(val, 10);

	if (isNaN(port)) return val;

	if (port >= 0) return port;

	return false;

};

const onError = err => {

	if (err.syscall !== 'listen') throw err;

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	switch (err.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw err;
	}

};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

createConstraints().then(() => {

	server.listen(port, () => console.log(`Listening on port ${port}`));

	server.on('error', onError);

});
