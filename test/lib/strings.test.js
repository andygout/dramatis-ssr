import { expect } from 'chai';

import { capitalise } from '../../src/lib/strings';

describe('Strings module', () => {

	describe('Capitalise function', () => {

		it('returns string with initial letter as capital', () => {

			expect(capitalise('string')).to.eq('String');

		});

	});

});
