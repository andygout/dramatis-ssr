import { expect } from 'chai';

import getDifferentiatorSuffix from '../../../src/lib/get-differentiator-suffix';

describe('Get Differentiator Suffix module', () => {

	context('differentiator is null', () => {

		it('returns empty string', () => {

			expect(getDifferentiatorSuffix(null)).to.equal('');

		});

	});

	context('differentiator is a string that is not a number', () => {

		it('returns differentiator value in parentheses', () => {

			expect(getDifferentiatorSuffix('foobar')).to.equal(' (foobar)');

		});

	});

	context('differentiator is a string that is a number', () => {

		it('returns differentiator value preceded by hashtag in parentheses', () => {

			expect(getDifferentiatorSuffix('1')).to.equal(' (#1)');

		});

	});

});
