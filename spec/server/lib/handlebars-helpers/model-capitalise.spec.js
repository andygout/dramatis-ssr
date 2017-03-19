const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	capitalise: sinon.stub().returns('capitalise response'),
	pluralise: sinon.stub().returns('pluralise response')
};

const resetStubs = () => {

	stubs.capitalise.reset();
	stubs.pluralise.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/handlebars-helpers/model-capitalise', {
		'../capitalise': stubs.capitalise,
		'../pluralise': stubs.pluralise
	});

describe('Model Capitalise handlebars helper', () => {

	context('model instance', () => {

		it('will return model name of instance with first letter capitalised', () => {

			const productionInstance = { model: 'production' };
			expect(subject(productionInstance)).to.eq('capitalise response');
			expect(stubs.pluralise.notCalled).to.be.true;
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('production')).to.be.true;

		});

	});

	context('array of model instances', () => {

		it('will return pluralised model name of first instance in array with first letter capitalised', () => {

			const productionInstance = { model: 'production' };
			expect(subject([productionInstance])).to.eq('capitalise response');
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('pluralise response')).to.be.true;

		});

	});

});
