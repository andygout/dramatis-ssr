const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	capitalise: sinon.stub().returns('Production'),
	pluralise: sinon.stub().returns('productions')
};

const resetStubs = () => {

	stubs.capitalise.reset();
	stubs.pluralise.reset();

};

beforeEach(() => {

	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../../dist/lib/handlebars-helpers/model-capitalise', {
		'../capitalise': stubOverrides.capitalise || stubs.capitalise,
		'../pluralise': stubs.pluralise
	});

describe('Model Capitalise handlebars helper', () => {

	context('model instance', () => {

		it('will return model name of instance with first letter capitalised', () => {

			const subject = createSubject();
			expect(subject({ model: 'production' })).to.eq('Production');
			expect(stubs.pluralise.notCalled).to.be.true;
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('production')).to.be.true;

		});

	});

	context('array of model instances', () => {

		it('will return pluralised model name of first instance in array with first letter capitalised', () => {

			const capitaliseStub = sinon.stub().returns('Productions');
			const subject = createSubject({ capitalise: capitaliseStub });
			expect(subject([{ model: 'production' }])).to.eq('Productions');
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(capitaliseStub.calledOnce).to.be.true;
			expect(capitaliseStub.calledWithExactly('productions')).to.be.true;

		});

	});

});
