import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { capitalise } from '../../../src/lib/strings.js';

const context = describe;

describe('Strings module', () => {
	describe('capitalise function', () => {
		context('input string is lowercase', () => {
			it('returns string with initial letter as capital', () => {
				assert.equal(capitalise('string'), 'String');
			});
		});

		context('input string is uppercase', () => {
			it('returns string with initial letter as capital', () => {
				assert.equal(capitalise('STRING'), 'String');
			});
		});
	});
});
