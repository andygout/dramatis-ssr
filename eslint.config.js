import js from '@eslint/js';
import preactConfig from 'eslint-config-preact';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
	js.configs.recommended,
	importPlugin.flatConfigs.recommended,
	...preactConfig,
	{
		ignores: ['built/*', 'public/*']
	},
	{
		languageOptions: {
			globals: {
				...globals.node
			},
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		rules: {
			'import/namespace': ['error', { allowComputed: true }],
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', ['parent', 'sibling', 'index']],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					}
				}
			],
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
		files: ['**/*.jsx']
	},
	{
		files: ['src/client/**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser
			}
		},
		rules: {
			'prefer-arrow-callback': 'off'
		}
	},
	eslintConfigPrettier
];
