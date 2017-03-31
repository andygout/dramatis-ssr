const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	modelNamingProp: sinon.stub().returns('title')
};

const resetStubs = () => {

	stubs.modelNamingProp.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../dist/lib/instance-naming-value', {
		'./model-naming-prop': stubs.modelNamingProp
	});

describe('Instance Naming Value module', () => {

	it('will return value of naming property for given model', () => {

		const productionInstance = { model: 'production', title: 'Hamlet' };
		expect(subject(productionInstance)).to.eq('Hamlet');
		expect(stubs.modelNamingProp.calledOnce).to.be.true;
		expect(stubs.modelNamingProp.calledWithExactly('production')).to.be.true;

	});

});
