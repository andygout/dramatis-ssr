const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

let instance;

const stubs = {
	propIsObject: sinon.stub().returns(false)
};

const resetStubs = () => {
	stubs.propIsObject.reset();
};

beforeEach(function () {
	resetStubs();
});

function createSubject (stubOverrides = {}) {
	return proxyquire('../../../server/lib/verify-error-presence', {
		'./prop-is-object': stubOverrides.propIsObject || stubs.propIsObject
	});
};

describe('Verify Error Presence module', () => {

	it('will return false if no error values present', () => {
		const propIsObjectStub = sinon.stub();
		propIsObjectStub.onFirstCall().returns(false).onSecondCall().returns(true).onThirdCall().returns(false);
		const subject = createSubject({ propIsObject: propIsObjectStub });
		instance = { errors: {}, theatre: { errors: {} } };
		expect(subject(instance)).to.be.false;
	});

	it('will return false if no error properties present', () => {
		const subject = createSubject();
		instance = { notErrors: {} };
		expect(subject(instance)).to.be.false;
	});

	it('will return false if errors present in form of null value', () => {
		const subject = createSubject();
		instance = { errors: null };
		expect(subject(instance)).to.be.false;
	});

	it('will return false if errors present in form of array', () => {
		const subject = createSubject();
		instance = { errors: ['Title is too short'] };
		expect(subject(instance)).to.be.false;
	});

	it('will return true if top level errors present', () => {
		const subject = createSubject();
		instance = { errors: { title: ['Title is too short'] }, theatre: { errors: {} } };
		expect(subject(instance)).to.be.true;
	});

	it('will return true if nested errors present', () => {
		const propIsObjectStub = sinon.stub();
		propIsObjectStub.onFirstCall().returns(false).onSecondCall().returns(true);
		const subject = createSubject({ propIsObject: propIsObjectStub });
		instance = { errors: {}, theatre: { errors: { name: ['Name is too short'] } } };
		expect(subject(instance)).to.be.true;
	});

});
