const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

let instance;
const titleString = 'Hamlet';
const nameString = 'Almeida Theatre';

const stubs = {
	propIsObject: sinon.stub().returns(false)
};

const resetStubs = () => {

	stubs.propIsObject.reset();

};

beforeEach(function () {

	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../server/lib/trim-strings', {
		'./prop-is-object': stubOverrides.propIsObject || stubs.propIsObject
	});

describe('Trim Strings module', () => {

	it('will trim leading and trailing whitespace from top level string values', () => {
		const subject = createSubject();
		instance = { title: ` ${titleString} ` };
		subject(instance);
		expect(instance.title).to.eq(titleString);
	});

	it('will trim leading and trailing whitespace from nested string values', () => {
		const propIsObjectStub = sinon.stub();
		propIsObjectStub.onFirstCall().returns(true).onSecondCall().returns(false);
		const subject = createSubject({ propIsObject: propIsObjectStub });
		instance = { theatre: { name: ` ${nameString} ` } };
		subject(instance);
		expect(instance.theatre.name).to.eq(nameString);
	});

});
