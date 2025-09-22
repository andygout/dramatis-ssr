import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // eslint-disable-line no-underscore-dangle
const __dirname = path.dirname(__filename); // eslint-disable-line no-underscore-dangle

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import mochaPlugin from 'eslint-plugin-mocha';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	...compat.extends(
		'eslint:recommended',
		'plugin:react/recommended'
	),
	mochaPlugin.configs.recommended,
	{
		ignores: [
			'built/*',
			'public/*'
		]
	},
	{
		settings: {
			react: {
				version: 'detect'
			}
		}
	},
	{
		languageOptions: {
			globals: {
				...globals.node
			},
			ecmaVersion: 2020,
			sourceType: 'module'
		},
		rules: {
			'comma-dangle': 'error',
			eqeqeq: 'error',
			'guard-for-in': 'error',
			'new-cap': 'error',
			'no-caller': 'error',
			'no-console': 'error',
			'no-extend-native': 'error',
			'no-irregular-whitespace': 'error',
			'no-loop-func': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'no-undef': 'error',
			'no-underscore-dangle': 'error',
			'no-unused-vars': 'error',
			'no-var': 'error',
			'one-var': ['error', 'never'],
			quotes: ['error', 'single'],
			semi: 'error',
			'space-before-function-paren': 'error',
			'spaced-comment': 'error',
			strict: ['error', 'global'],
			'wrap-iife': 'error'
		}
	},
	{
		files: [
			'**/*.jsx'
		],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		plugins: {
			react: reactPlugin
		},
		rules: {
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off'
		}
	},
	{
		files: [
			'src/client/**/*.js'
		],
		languageOptions: {
			globals: {
				...globals.browser
			}
		}
	},
	{
		files: [
			'test/**/*.test.js'
		],
		languageOptions: {
			globals: {
				...globals.mocha
			}
		},
		plugins: {
			mocha: mochaPlugin
		},
		rules: {
			'mocha/no-exclusive-tests': 'error',
			'mocha/no-mocha-arrows': 'off'
		}
	}
];
