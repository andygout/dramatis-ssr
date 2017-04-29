const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'main.js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css-loader!sass-loader')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'main.css',
			allChunks: true,
			disable: false
		})
	]
};
