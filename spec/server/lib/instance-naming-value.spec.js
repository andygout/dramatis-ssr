const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	instanceNamingProp: sinon.stub().returns('title')
};

const resetStubs = () => {

	stubs.instanceNamingProp.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../dist/lib/instance-naming-value', {
		'./instance-naming-prop': stubs.instanceNamingProp
	});

describe('Instance Naming Value module', () => {

	it('will return property value as dictated by listedNamingProps', () => {

		const productionInstance = { model: 'production', title: 'Hamlet' };
		expect(subject(productionInstance)).to.eq('Hamlet');
		expect(stubs.instanceNamingProp.calledOnce).to.be.true;
		expect(stubs.instanceNamingProp.calledWithExactly(productionInstance.model)).to.be.true;

	});

});
