const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

let stubs;
let subject;

beforeEach(() => {

	stubs = {
		pluralise: sandbox.stub().returns('productions')
	};

	subject = proxyquire('../../../dist/lib/instance-route', {
			'./pluralise': stubs.pluralise
		});

});

afterEach(() => {

	sandbox.restore();

});

describe('Instance Route module', () => {

	it('will return URL (pluralised model name and uuid) for instance', () => {

		const productionInstance = { model: 'production', uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' };
		expect(subject(productionInstance)).to.eq('/productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
		expect(stubs.pluralise.calledOnce).to.be.true;
		expect(stubs.pluralise.calledWithExactly(productionInstance.model)).to.be.true;

	});

});
