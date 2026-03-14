import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import formatDate from '../../../src/lib/format-date.js';

const context = describe;

describe('Format Date module', () => {
	context('custom options are not provided', () => {
		context('given month is not September', () => {
			it('returns a date formatted as to: DD - abbreviated month - YYYY', () => {
				assert.equal(formatDate('2021-04-09'), '09 Apr 2021');
			});
		});

		context('given month is September', () => {
			it("returns a date formatted as to: DD - abbreviated month - YYYY; converts 'Sept' to 'Sep'", () => {
				assert.equal(formatDate('2021-09-01'), '01 Sep 2021');
			});
		});
	});

	context('custom options are provided', () => {
		context('given month is not September', () => {
			it('returns a date formatted by factoring in the custom options; strips commas from literal parts', () => {
				assert.equal(formatDate('2021-04-09', { weekday: 'long', month: 'long' }), 'Friday 09 April 2021');
			});
		});

		context('given month is September', () => {
			it('returns a date formatted by factoring in the custom options; strips commas from literal parts', () => {
				assert.equal(
					formatDate('2021-09-01', { weekday: 'long', month: 'long' }),
					'Wednesday 01 September 2021'
				);
			});
		});
	});
});
