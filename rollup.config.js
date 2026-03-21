import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';

const serverBundle = {
	input: 'src/server.js',
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
			targets: [{ src: './src/assets/favicon.ico', dest: 'built/assets' }]
		})
	]
};

const clientAssetsBundle = {
	input: 'src/client/assets/index.js',
	output: {
		dir: 'public'
	},
	watch: {
		clearScreen: false
	},
	plugins: [
		copy({
			targets: [
				{
					src: './src/client/assets/*',
					dest: 'public/assets'
				}
			]
		})
	]
};

const clientScriptsBundle = {
	input: 'src/client/scripts/index.js',
	output: {
		file: 'public/scripts/main.js',
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
	input: 'src/client/stylesheets/index.js',
	output: {
		dir: 'public'
	},
	watch: {
		clearScreen: false
	},
	plugins: [
		nodeResolve({
			browser: true
		}),
		postcss({
			plugins: [postcssImport()],
			extract: 'stylesheets/main.css',
			minimize: false
		})
	]
};

export default [serverBundle, clientAssetsBundle, clientScriptsBundle, clientStylesBundle];
