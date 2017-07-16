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

	it('will return instanceLink response when model and uuid present otherwise instance name value or instance itself if name value absent', () => {

		const instancesArray = [
			{ model: 'character', name: 'Hamlet', uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
			{ name: 'Claudius', uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
			{ model: 'character', name: 'Gertrude' },
			{ name: 'Ophelia' },
			'Polonius'
		];
		expect(subject(instancesArray)).to.eq('instanceLink response / Claudius / Gertrude / Ophelia / Polonius');
		expect(stubs.instanceLink.calledOnce).to.be.true;
		expect(stubs.instanceLink.calledWithExactly(instancesArray[0])).to.be.true;

	});

});
