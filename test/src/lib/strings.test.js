import { expect } from 'chai';

import { capitalise } from '../../../src/lib/strings';

describe('Strings module', () => {

	describe('capitalise function', () => {

		context('input string is lowercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('string')).to.equal('String');

			});

		});

		context('input string is uppercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('STRING')).to.equal('String');

			});

		});

	});

});
