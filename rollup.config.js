import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import scss from './rollup-plugin-scss.js';
import * as sass from 'sass';

const serverBundle = {
	input: 'src/app.js',
	output: {
		file: 'built/main.js'
	},
	plugins: [
		esbuild({
			// All options are optional
			include: /\.[jt]sx?$/, // default, inferred from `loaders` option
			exclude: /node_modules/, // default
			sourceMap: true, // default
			minify: process.env.NODE_ENV === 'production',
			target: 'es2017', // default, or 'es20XX', 'esnext'
			jsx: 'transform', // default, or 'preserve'
			jsxFactory: 'h',
			jsxFragment: 'Fragment',
			// Add extra loaders
			loaders: {
				// Add .json files support
				// require @rollup/plugin-commonjs
				'.json': 'json',
				// Enable JSX in .js files too
				'.js': 'jsx'
			}
		})
	]
};

const clientScriptsBundle = {
	input: 'src/client/scripts/index.js',
	output: {
		file: 'public/main.js',
		format: 'iife'
	},
	plugins: [
		nodeResolve({
			browser: true,
			extensions: ['.js', '.jsx']
		}),
		commonjs()
	]
};

const clientStylesBundle = {
	input: 'src/client/stylesheets/index.scss',
	output: {
		dir: 'public'
	},
	plugins: [
		scss({
			fileName: 'main.css',
			failOnError: true,
			sass
		})
	]
};

export default [
	serverBundle,
	clientScriptsBundle,
	clientStylesBundle
]
