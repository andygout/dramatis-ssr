require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const router = require('./server/routes');

const app = express();
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.html' });

app.engine('html', hbs.engine);

app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'client', 'favicons', 'favicon.ico')));
app.use(logger('dev'));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(flash());

app.use(
	sassMiddleware({
		src: path.join(__dirname, 'client', 'stylesheets'),
		dest: path.join(__dirname, 'client', 'public'),
		prefix: '/stylesheets',
		debug: true
	})
);
app.use(express.static(path.join(__dirname, 'client', 'public')));

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handlers
// Development error handler - will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		console.log(err);
		res.status(err.status || 500);
		res.render('error', {
			message: `${err.status || 500} Error: ${err.message}`,
			error: err
		});
	});
}

// Production error handler - no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: `${err.status || 500} Error: ${err.message}`,
		error: {}
	});
});

const normalizePort = val => {
	const port = parseInt(val, 10);
	if (isNaN(port)) return val;
	if (port >= 0) return port;
	return false;
}

const onError = error => {
	if (error.syscall !== 'listen') throw error;
	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

const onListening = () => {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.log('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
