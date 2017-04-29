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

beforeEach(() => {

	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/lib/verify-error-presence', {
		'./prop-is-object': stubOverrides.propIsObject || stubs.propIsObject
	});

describe('Verify Error Presence module', () => {

	context('no valid error values present', () => {

		it('will return false if no error values present', () => {

			const propIsObjectStub = sinon.stub();
			propIsObjectStub.onFirstCall().returns(false).onSecondCall().returns(true).onThirdCall().returns(false);
			const subject = createSubject({ propIsObject: propIsObjectStub });
			instance = { errors: {}, theatre: { errors: {} } };
			const result = subject(instance);
			expect(propIsObjectStub.calledThrice).to.be.true;
			sinon.assert.calledWithExactly(propIsObjectStub.firstCall, {});
			sinon.assert.calledWithExactly(propIsObjectStub.secondCall, { errors: {} });
			sinon.assert.calledWithExactly(propIsObjectStub.thirdCall, {});
			expect(result).to.be.false;

		});

		it('will return false if no error properties present', () => {

			const subject = createSubject();
			instance = { notErrors: {} };
			const result = subject(instance);
			expect(stubs.propIsObject.calledOnce).to.be.true;
			expect(stubs.propIsObject.calledWithExactly({})).to.be.true;
			expect(result).to.be.false;

		});

		it('will return false if errors present in form of null value', () => {

			const subject = createSubject();
			instance = { errors: null };
			const result = subject(instance);
			expect(stubs.propIsObject.calledOnce).to.be.true;
			expect(stubs.propIsObject.calledWithExactly(null)).to.be.true;
			expect(result).to.be.false;

		});

		it('will return false if errors present in form of array', () => {

			const subject = createSubject();
			instance = { errors: ['Title is too short'] };
			const result = subject(instance);
			expect(stubs.propIsObject.calledTwice).to.be.true;
			sinon.assert.calledWithExactly(stubs.propIsObject.firstCall, ['Title is too short']);
			sinon.assert.calledWithExactly(stubs.propIsObject.secondCall, 'Title is too short');
			expect(result).to.be.false;

		});

	});

	context('top level errors present', () => {

		it('will return true', () => {

			const subject = createSubject();
			instance = { errors: { title: ['Title is too short'] } };
			const result = subject(instance);
			expect(stubs.propIsObject.notCalled).to.be.true;
			expect(result).to.be.true;

		});

	});

	context('nested errors present', () => {

		it('will return true', () => {

			const propIsObjectStub = sinon.stub().returns(true);
			const subject = createSubject({ propIsObject: propIsObjectStub });
			instance = { theatre: { errors: { name: ['Name is too short'] } } };
			const result = subject(instance);
			expect(propIsObjectStub.calledOnce).to.be.true;
			expect(propIsObjectStub.calledWithExactly({ errors: { name: ['Name is too short'] } })).to.be.true;
			expect(result).to.be.true;


		});

	});

	context('errors present in objects in arrays at top level', () => {

		it('will return true', () => {

			const propIsObjectStub = sinon.stub();
			propIsObjectStub.onFirstCall().returns(false).onSecondCall().returns(true);
			const subject = createSubject({ propIsObject: propIsObjectStub });
			instance = { cast: [{ errors: { name: ['Name is too short'] } }] };
			const result = subject(instance);
			expect(propIsObjectStub.calledTwice).to.be.true;
			sinon.assert.calledWithExactly(propIsObjectStub.firstCall, [{ errors: { name: ['Name is too short'] } }]);
			sinon.assert.calledWithExactly(propIsObjectStub.secondCall, { errors: { name: ['Name is too short'] } });
			expect(result).to.be.true;


		});

	});

});
