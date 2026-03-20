import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import getDifferentiatorSuffix from '../../../src/lib/get-differentiator-suffix.js';

const context = describe;

describe('Get Differentiator Suffix module', () => {
	context('differentiator is null', () => {
		it('returns empty string', () => {
			assert.equal(getDifferentiatorSuffix(null), '');
		});
	});

	context('differentiator is a string that is not a number', () => {
		it('returns differentiator value in parentheses', () => {
			assert.equal(getDifferentiatorSuffix('foobar'), ' (foobar)');
		});
	});

	context('differentiator is a string that is a number', () => {
		it('returns differentiator value preceded by hashtag in parentheses', () => {
			assert.equal(getDifferentiatorSuffix('1'), ' (#1)');
		});
	});
});
