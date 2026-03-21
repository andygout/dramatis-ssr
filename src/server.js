import http from 'node:http';

import app from './app.js';

const port = '3003';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console

const shutDown = async () => {
	server.closeAllConnections();
	await new Promise((resolve) => server.close(resolve));
};

process.on('SIGTERM', () => {
	void shutDown();
});

process.on('SIGINT', () => {
	void shutDown();
});

export default server;
