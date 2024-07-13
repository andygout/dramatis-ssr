import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // eslint-disable-line no-underscore-dangle
const __dirname = path.dirname(__filename); // eslint-disable-line no-underscore-dangle

import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as sass from 'sass';
import nodeExternals from 'webpack-node-externals';

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
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										node: '22'
									}
								}
							]
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
			mode: 'light' // Generates only a single favicon for fast compilation time in development mode.
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
	entry: [
		'./src/client/scripts/index.js',
		'./src/client/stylesheets/index.scss'
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							// Prefer `dart-sass`
							implementation: sass
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	]
};

export default [
	serverConfig,
	clientConfig
];
