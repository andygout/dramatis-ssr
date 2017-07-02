const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

let stubs;
let subject;

beforeEach(() => {

	stubs = {
		instanceRoute: sandbox.stub().returns('instanceRoute response')
	};

	subject = proxyquire('../../../dist/lib/instance-link', {
			'./instance-route': stubs.instanceRoute
		});

});

afterEach(() => {

	sandbox.restore();

});

describe('Instance Link module', () => {

	it('will return URL (pluralised model name and uuid) for instance', () => {

		const productionInstance = { name: 'Hamlet' };
		expect(subject(productionInstance)).to.eq('<a href="instanceRoute response">Hamlet</a>');
		expect(stubs.instanceRoute.calledOnce).to.be.true;
		expect(stubs.instanceRoute.calledWithExactly(productionInstance)).to.be.true;

	});

});
