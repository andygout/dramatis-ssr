const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const dbQueryFixture = require('../../fixtures/db-query');

let instance;

const stubs = {
	dbQuery: sinon.stub().resolves(dbQueryFixture),
	trimStrings: sinon.stub(),
	validateString: sinon.stub().returns([]),
	verifyErrorPresence: sinon.stub().returns(false)
};

const resetStubs = () => {

	stubs.dbQuery.reset();
	stubs.trimStrings.reset();
	stubs.validateString.reset();
	stubs.verifyErrorPresence.reset();

};

beforeEach(() => {

	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/models/person', {
		'../database/db-query': stubOverrides.dbQuery || stubs.dbQuery,
		'../lib/trim-strings': stubs.trimStrings,
		'../lib/validate-string': stubOverrides.validateString || stubs.validateString,
		'../lib/verify-error-presence': stubOverrides.verifyErrorPresence || stubs.verifyErrorPresence
	});

const createInstance = (stubOverrides = {}) => {

	const subject = createSubject(stubOverrides);

	return new subject();

};

describe('Person model', () => {

	describe('validate method', () => {

		it('will trim strings before validating name', () => {

			instance = createInstance();
			instance.validate();
			expect(stubs.trimStrings.calledBefore(stubs.validateString)).to.be.true;
			expect(stubs.trimStrings.calledOnce).to.be.true;
			expect(stubs.validateString.calledOnce).to.be.true;

		});

		context('valid data', () => {

			it('will not add properties to errors property', () => {

				instance = createInstance();
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

	describe('validateUpdateInDb method', () => {

		it('will validate update in database', done => {

			instance = createInstance();
			instance.validateUpdateInDb().then(() => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				done();
			});

		});

		context('valid data (results returned that indicate name does not already exist)', () => {

			it('will not add properties to errors property', done => {

				instance = createInstance({ dbQuery: sinon.stub().resolves({ personCount: 0 }) });
				instance.validateUpdateInDb().then(() => {
					expect(instance.errors).not.to.have.property('name');
					expect(instance.errors).to.deep.eq({});
					done();
				});

			});

		});

		context('invalid data (results returned that indicate name already exists)', () => {

			it('will add properties that are arrays to errors property', done => {

				instance = createInstance({ dbQuery: sinon.stub().resolves({ personCount: 1 }) });
				instance.validateUpdateInDb().then(() => {
					expect(instance.errors)
						.to.have.property('name')
						.that.is.an('array')
						.that.deep.eq(['Name already exists']);
					done();
				});

			});

		});

	});

	describe('edit method', () => {

		it('will get edit data', done => {

			instance = createInstance();
			instance.edit().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

	describe('update method', () => {

		context('valid data', () => {

			it('will update', done => {

				instance = createInstance();
				sinon.spy(instance, 'validate');
				sinon.spy(instance, 'validateUpdateInDb');
				instance.update().then(result => {
					sinon.assert.callOrder(
						instance.validate,
						stubs.verifyErrorPresence,
						instance.validateUpdateInDb,
						stubs.dbQuery,
						stubs.verifyErrorPresence,
						stubs.dbQuery
					);
					expect(instance.validate.calledOnce).to.be.true;
					expect(instance.validate.calledWithExactly({ mandatory: true })).to.be.true;
					expect(stubs.verifyErrorPresence.calledTwice).to.be.true;
					expect(instance.validateUpdateInDb.calledOnce).to.be.true;
					expect(stubs.dbQuery.calledTwice).to.be.true;
					expect(result).to.deep.eq(dbQueryFixture);
					done();
				});

			});

		});

		context('invalid data', () => {

			context('initial validation errors caused by submitted values', () => {

				it('will return instance without updating', done => {

					const verifyErrorPresenceStub = sinon.stub().returns(true);
					instance = createInstance({ verifyErrorPresence: verifyErrorPresenceStub });
					sinon.spy(instance, 'validate');
					sinon.spy(instance, 'validateUpdateInDb');
					instance.update().then(result => {
						expect(instance.validate.calledBefore(verifyErrorPresenceStub)).to.be.true;
						expect(instance.validate.calledOnce).to.be.true;
						expect(verifyErrorPresenceStub.calledOnce).to.be.true;
						expect(instance.validateUpdateInDb.notCalled).to.be.true;
						expect(stubs.dbQuery.notCalled).to.be.true;
						expect(result).to.deep.eq({ person: instance });
						done();
					});

				});

			});

			context('secondary validation errors caused by database checks', () => {

				it('will return instance without updating', done => {

					const verifyErrorPresenceStub = sinon.stub();
					verifyErrorPresenceStub.onFirstCall().returns(false).onSecondCall().returns(true);
					instance = createInstance({ verifyErrorPresence: verifyErrorPresenceStub });
					sinon.spy(instance, 'validate');
					sinon.spy(instance, 'validateUpdateInDb');
					instance.update().then(result => {
						sinon.assert.callOrder(
							instance.validate,
							verifyErrorPresenceStub,
							instance.validateUpdateInDb,
							stubs.dbQuery,
							verifyErrorPresenceStub
						);
						expect(instance.validate.calledOnce).to.be.true;
						expect(verifyErrorPresenceStub.calledTwice).to.be.true;
						expect(instance.validateUpdateInDb.calledOnce).to.be.true;
						expect(stubs.dbQuery.calledOnce).to.be.true;
						expect(result).to.deep.eq({ person: instance });
						done();
					});

				});

			});

		});

	});

	describe('delete method', () => {

		it('will delete', done => {

			instance = createInstance();
			instance.delete().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

	describe('show method', () => {

		it('will get show data', done => {

			instance = createInstance();
			instance.show().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

	describe('list method', () => {

		it('will get list data', done => {

			const subject = createSubject();
			subject.list().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

});
