const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	capitalise: sinon.stub().returns('Production')
};

const resetStubs = () => {

	stubs.capitalise.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/handlebars-helpers/model-capitalise', {
		'../capitalise': stubs.capitalise
	});

describe('Model Capitalise handlebars helper', () => {

	context('model instance', () => {

		it('will return model name of instance with first letter capitalised', () => {

			const productionInstance = { model: 'production' };
			expect(subject(productionInstance)).to.eq('Production');
			expect(stubs.capitalise.calledWithExactly('production')).to.be.true;

		});

	});

	context('array of model instances', () => {

		it('will return pluralised model name of first instance in array with first letter capitalised', () => {

			const productionInstance = { model: 'production' };
			expect(subject([productionInstance])).to.eq('Production');
			expect(stubs.capitalise.calledWithExactly('productions')).to.be.true;

		});

	});

});
