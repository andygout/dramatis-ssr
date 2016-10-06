import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import exphbs from 'express-handlebars';
import favicon from 'serve-favicon';
import logger from 'morgan';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import { router } from './server/routes';

const app = express();
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.html' })

app.engine('html', hbs.engine);

app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, './client/favicons', 'favicon.ico')));
app.use(logger('dev'));

app.use(
	sassMiddleware({
		src: __dirname + '/client/stylesheets',
		dest: __dirname + '/client/public',
		prefix:  '/stylesheets',
		debug: true,
	})
);
app.use(express.static(path.join(__dirname, './client', 'public')));

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
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Production error handler - no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
