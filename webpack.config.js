const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const serverConfig = {
	mode: 'none', // i.e. not production or development (see: https://webpack.js.org/configuration/mode).
	target: 'node',
	node: {
		__dirname: false
	},
	externals: [nodeExternals()],
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'built'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							[
								'@babel/plugin-transform-react-jsx',
								{
									pragma: 'h',
									pragmaFrag: 'Fragment'
								}
							]
						]
					}

				}
			}
		]
	},
	plugins: [
		new FaviconsWebpackPlugin({
			logo: './src/client/assets/favicon.ico',
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: ['node_modules'],
		descriptionFiles: ['package.json']
	}
};

const clientConfig = {
	mode: 'none', // i.e. not production or development (see: https://webpack.js.org/configuration/mode).
	entry: './src/client/stylesheets/main.scss',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	]
};

module.exports = [
	serverConfig,
	clientConfig
];
