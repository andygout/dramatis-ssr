const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	pluralise: sinon.stub().returns('pluralise response')
};

const resetStubs = () => {

	stubs.pluralise.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/handlebars-helpers/model', {
		'../pluralise': stubs.pluralise
	});

describe('Model handlebars helper', () => {

	context('model instance', () => {

		it('will return model name of instance', () => {

			const productionInstance = { model: 'production' };
			expect(subject(productionInstance)).to.eq('production');
			expect(stubs.pluralise.notCalled).to.be.true;

		});

	});

	context('array of model instances', () => {

		it('will return pluralised model name of first instance in array', () => {

			const productionInstance = { model: 'production' };
			expect(subject([productionInstance])).to.eq('pluralise response');
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;

		});

	});

});
