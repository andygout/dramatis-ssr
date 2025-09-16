import { expect } from 'chai';

import { formatDate } from '../../../src/lib/format-date.js';

describe('Format Date module', () => {

	context('custom options are not provided', () => {

		it('returns a date formatted as to: DD - abbreviated month - YYYY', () => {

			expect(formatDate('2021-04-09')).to.equal('09 Apr 2021');

		});

	});

	context('custom options are provided', () => {

		it('returns a date formatted by factoring in the custom options', () => {

			expect(formatDate('2021-04-09', { weekday: 'long', month: 'long' })).to.equal('Friday, 09 April 2021');

		});

	});

});
