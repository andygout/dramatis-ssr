import { expect } from 'chai';

import { capitalise, pluralise, singularise } from '../../src/lib/strings';

describe('Strings module', () => {

	describe('Capitalise function', () => {

		context('Input string is lowercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('string')).to.eq('String');

			});

		});

		context('Input string is uppercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('STRING')).to.eq('String');

			});

		});

	});

	describe('Pluralise function', () => {

		context('Model has regular plural noun', () => {

			it('returns singular noun with appended \'s\'', () => {

				expect(pluralise('production')).to.eq('productions');

			});

		});

		context('Model has irregular plural noun', () => {

			it('returns specific plural noun', () => {

				expect(pluralise('person')).to.eq('people');

			});

		});

	});

	describe('Singularise function', () => {

		context('Model has regular plural noun', () => {

			it('returns plural noun with tailing \'s\' removed', () => {

				expect(singularise('productions')).to.eq('production');

			});

		});

		context('Model has irregular plural noun', () => {

			it('returns specific singular noun', () => {

				expect(singularise('people')).to.eq('person');

			});

		});

	});

});
