import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import session from 'express-session';
import favicon from 'serve-favicon';
import http from 'http';
import logger from 'morgan';
import path from 'path';

import { errorHandler } from './middleware';
import router from './router';

const app = express();

app.use(
	favicon(path.join(__dirname, 'favicons', 'favicon.ico')), // Path is relative to `built/main.js`.
	logger('dev'),
	session({ secret: 'secret', resave: false, saveUninitialized: true }),
	express.static('public'),
	router,
	errorHandler
);

const port = '3001';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
