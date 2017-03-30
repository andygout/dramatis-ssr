const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	capitalise: sinon.stub().returns('Productions')
};

const resetStubs = () => {

	stubs.capitalise.reset();

};

beforeEach(() => {

	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/lib/get-list-page-data', {
		'./capitalise': stubOverrides.capitalise || stubs.capitalise
	});

describe('Get List Page Data module', () => {

	context('pluralisedModel argument is \'productions\'', () => {

		it('will return data for home page', () => {

			const subject = createSubject();
			expect(subject('productions')).to.deep.eq({ documentTitle: ' | Home', title: 'Productions' });

		});

	});

	context('pluralisedModel argument is not \'productions\'', () => {

		it('will return data for specific model', () => {

			const subject = createSubject({ capitalise: sinon.stub().returns('Theatres') });
			expect(subject('theatres')).to.deep.eq({ documentTitle: ' | Theatres', title: 'Theatres' });

		});

	});

});
