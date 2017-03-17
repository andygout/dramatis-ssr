const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	capitalise: sinon.stub().returns('Title')
};

const resetStubs = () => {

	stubs.capitalise.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/handlebars-helpers/input-name', {
		'../capitalise': stubs.capitalise
	});

describe('Input Name handlebars helper', () => {

	context('instance and propertyName both present', () => {

		it('will return instance model name and propertyName as single string in camel case', () => {

			const productionInstance = { model: 'production' };
			expect(subject(productionInstance, 'title')).to.eq('productionTitle');
			expect(stubs.capitalise.calledWith('title')).to.be.true;

		});

	});

	context('instance absent and propertyName present', () => {

		it('will return propertyName as string', () => {

			expect(subject(null, 'title')).to.eq('title');
			expect(stubs.capitalise.notCalled).to.be.true;

		});

	});

});
