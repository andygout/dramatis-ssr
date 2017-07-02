const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

let stubs;
let subject;

beforeEach(() => {

	stubs = {
		instanceLink: sandbox.stub().returns('instanceLink response')
	};

	subject = proxyquire('../../../../dist/lib/handlebars-helpers/join', {
			'../instance-link': stubs.instanceLink
		});

});

afterEach(() => {

	sandbox.restore();

});

describe('Join handlebars helper', () => {

	it('will return instanceLink response when model and uuid present otherwise will return instance name value', () => {

		const instancesArray = [
			{ name: 'Hamlet' },
			{ model: 'character', name: 'Claudius' },
			{ name: 'Gertrude', uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
			{ model: 'character', name: 'Ophelia', uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }
		];
		expect(subject(instancesArray)).to.eq('Hamlet / Claudius / Gertrude / instanceLink response');
		expect(stubs.instanceLink.calledOnce).to.be.true;
		expect(stubs.instanceLink.calledWithExactly(instancesArray[3])).to.be.true;

	});

});
