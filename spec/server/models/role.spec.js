const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const sandbox = sinon.sandbox.create();

let stubs;
let instance;

beforeEach(() => {

	stubs = {
		trimStrings: sandbox.stub(),
		validateString: sandbox.stub().returns([])
	};

	instance = createInstance();

});

afterEach(() => {

	sandbox.restore();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/models/role', {
		'../lib/trim-strings': stubs.trimStrings,
		'../lib/validate-string': stubOverrides.validateString || stubs.validateString
	});

const createInstance = (stubOverrides = {}) => {

	const subject = createSubject(stubOverrides);

	return new subject({ name: 'Hamlet' });

};

describe('Role model', () => {

	describe('validate method', () => {

		it('will trim strings before validating name', () => {

			instance.validate();
			expect(stubs.trimStrings.calledBefore(stubs.validateString)).to.be.true;
			expect(stubs.trimStrings.calledOnce).to.be.true;
			expect(stubs.trimStrings.calledWithExactly(instance)).to.be.true;
			expect(stubs.validateString.calledOnce).to.be.true;
			expect(stubs.validateString.calledWithExactly(instance.name, 'Name', {})).to.be.true;

		});

		context('valid data', () => {

			it('will not add properties to errors property', () => {


				instance.validate();
				expect(instance.errors).not.to.have.property('name');
				expect(instance.errors).to.deep.eq({});

			});

		});

		context('invalid data', () => {

			it('will add properties that are arrays to errors property', () => {

				instance = createInstance({ validateString: sinon.stub().returns(['Name is too short']) });
				instance.validate();
				expect(instance.errors)
					.to.have.property('name')
					.that.is.an('array')
					.that.deep.eq(['Name is too short']);

			});

		});

	});

});
