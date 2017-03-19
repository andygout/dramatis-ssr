const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	pluralise: sinon.stub().returns('productions')
};

const resetStubs = () => {

	stubs.pluralise.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../dist/lib/instance-route', {
		'./pluralise': stubs.pluralise
	});

describe('Instance Route module', () => {

	it('will return URL (pluralised model name and uuid) for instance', () => {

		const productionInstance = { model: 'production', uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' };
		expect(subject(productionInstance)).to.eq('/productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
		expect(stubs.pluralise.calledOnce).to.be.true;
		expect(stubs.pluralise.calledWithExactly(productionInstance.model)).to.be.true;

	});

});
