import path from 'node:path';

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import esbuild from 'rollup-plugin-esbuild';
import sassPlugin from 'rollup-plugin-sass';
import watchGlobs from 'rollup-plugin-watch-globs';
import * as sass from 'sass';

const serverBundle = {
	input: 'src/app.js',
	output: {
		file: 'built/main.js',
		sourcemap: 'inline'
	},
	external: [
		'express',
		'express-session',
		'morgan',
		'node:http',
		'node:path',
		'node:url',
		'preact',
		'preact-render-to-string',
		'preact/hooks',
		'react/jsx-runtime',
		'serve-favicon'
	],
	watch: {
		clearScreen: false
	},
	plugins: [
		esbuild({
			jsx: 'automatic'
		}),
		copy({
			targets: [
				{ src: './src/client/assets/favicon.ico', dest: 'built/assets' }
			]
		})
	]
};

const clientScriptsBundle = {
	input: 'src/client/scripts/index.js',
	output: {
		file: 'public/main.js',
		format: 'iife'
	},
	watch: {
		clearScreen: false
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
	watch: {
		clearScreen: false
	},
	plugins: [
		watchGlobs([
			'src/client/stylesheets/**/*.scss'
		]),
		sassPlugin({
			output: 'public/main.css',
			api: 'modern',
			runtime: sass,
			options: {
				// Let @import find packages' stylesheets by looking in node_modules directory.
				loadPaths: [
					path.resolve('node_modules')
				],
				// Until dependencies have migrated to Sass's modern compiler API.
				silenceDeprecations: [
					'import',
					'global-builtin',
					'color-functions'
				]
			}
		})
	]
};

export default [
	serverBundle,
	clientScriptsBundle,
	clientStylesBundle
];
