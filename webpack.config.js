const path = require('path');

module.exports = {
	entry: './client/scripts/main.js',
	output: {
		filename: 'main.js',
		path: path.join(__dirname, 'client', 'public')
	}
};
