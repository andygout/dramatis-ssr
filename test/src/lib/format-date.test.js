import { expect } from 'chai';

import { formatDate } from '../../../src/lib/format-date.js';

describe('Format Date module', () => {

	context('custom options are not provided', () => {

		context('given month is not September', () => {

			it('returns a date formatted as to: DD - abbreviated month - YYYY', () => {

				expect(formatDate('2021-04-09')).to.equal('09 Apr 2021');

			});

		});

		context('given month is September', () => {

			it('returns a date formatted as to: DD - abbreviated month - YYYY; converts \'Sept\' to \'Sep\'', () => {

				expect(formatDate('2021-09-01')).to.equal('01 Sep 2021');

			});

		});

	});

	context('custom options are provided', () => {

		context('given month is not September', () => {

			it('returns a date formatted by factoring in the custom options; strips commas from literal parts', () => {

				expect(formatDate('2021-04-09', { weekday: 'long', month: 'long' })).to.equal('Friday 09 April 2021');

			});

		});

		context('given month is September', () => {

			it('returns a date formatted by factoring in the custom options; strips commas from literal parts', () => {

				expect(formatDate('2021-09-01', { weekday: 'long', month: 'long' })).to.equal('Wednesday 01 September 2021');

			});

		});

	});

});
