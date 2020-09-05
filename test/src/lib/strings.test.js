import { expect } from 'chai';

import { capitalise, pluralise, singularise } from '../../../src/lib/strings';

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

	describe('pluralise function', () => {

		context('model has regular plural noun', () => {

			it('returns singular noun with appended \'s\'', () => {

				expect(pluralise('production')).to.equal('productions');

			});

		});

		context('model has irregular plural noun', () => {

			it('returns specific plural noun', () => {

				expect(pluralise('person')).to.equal('people');

			});

		});

	});

	describe('singularise function', () => {

		context('model has regular plural noun', () => {

			it('returns plural noun with tailing \'s\' removed', () => {

				expect(singularise('productions')).to.equal('production');

			});

		});

		context('model has irregular plural noun', () => {

			it('returns specific singular noun', () => {

				expect(singularise('people')).to.equal('person');

			});

		});

	});

});
