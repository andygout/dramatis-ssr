const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Production = require('../../../dist/models/production');

const dbQueryListFixture = require('../../fixtures/theatres/db-query-list');

const stubs = {
	dbQuery: sinon.stub().resolves({}),
	renewValues: sinon.stub(),
	trimStrings: sinon.stub(),
	validateString: sinon.stub().returns([]),
	verifyErrorPresence: sinon.stub().returns(false),
	Production: sinon.stub().returns(sinon.createStubInstance(Production))
};

const resetStubs = () => {

	stubs.dbQuery.reset();
	stubs.renewValues.reset();
	stubs.trimStrings.reset();
	stubs.validateString.reset();
	stubs.verifyErrorPresence.reset();
	stubs.Production.reset();

};

beforeEach(() => {

	resetStubs();

});

let instance;

const createSubject = stubOverrides =>
	proxyquire('../../../dist/models/theatre', {
		'../database/db-query': stubOverrides.dbQuery || stubs.dbQuery,
		'../lib/renew-values': stubs.renewValues,
		'../lib/trim-strings': stubs.trimStrings,
		'../lib/validate-string': stubOverrides.validateString || stubs.validateString,
		'../lib/verify-error-presence': stubOverrides.verifyErrorPresence || stubs.verifyErrorPresence,
		'./production': stubs.Production
	});

const createInstance = (stubOverrides = {}) => {

	const subject = createSubject(stubOverrides);

	return new subject();

};

describe('Theatre model', () => {

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

		it('will call dbQuery to validate update', done => {
			instance = createInstance();
			instance.validateUpdateInDb().then(() => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				done();
			});
		});

		context('valid data (results returned that indicate name does not already exist)', () => {

			it('will not add properties to errors property', done => {
				instance = createInstance({ dbQuery: sinon.stub().resolves({ theatreCount: 0 }) });
				instance.validateUpdateInDb().then(() => {
					expect(instance.errors).not.to.have.property('name');
					expect(instance.errors).to.deep.eq({});
					done();
				});
			});

		});

		context('invalid data (results returned that indicate name already exists)', () => {

			it('will add properties that are arrays to errors property', done => {
				instance = createInstance({ dbQuery: sinon.stub().resolves({ theatreCount: 1 }) });
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

	describe('validateDeleteInDb method', () => {

		it('will call dbQuery to validate delete', done => {
			instance = createInstance();
			instance.validateUpdateInDb().then(() => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				done();
			});
		});

		context('valid data (results returned that indicate no dependent associations exist)', () => {

			it('will not add properties to errors property', done => {
				instance = createInstance({ dbQuery: sinon.stub().resolves({ relationshipCount: 0 }) });
				instance.validateDeleteInDb().then(() => {
					expect(instance.errors).not.to.have.property('associations');
					expect(instance.errors).to.deep.eq({});
					done();
				});
			});

		});

		context('invalid data (results returned that indicate dependent associations exist)', () => {

			it('will add properties that are arrays to errors property', done => {
				instance = createInstance({ dbQuery: sinon.stub().resolves({ relationshipCount: 1 }) });
				instance.validateDeleteInDb().then(() => {
					expect(instance.errors)
						.to.have.property('associations')
						.that.is.an('array')
						.that.deep.eq(['productions']);
					done();
				});
			});

		});

	});

	describe('getShowData method', () => {

		it('will get show data then return renewed instance', done => {
			instance = createInstance();
			instance.getShowData().then(result => {
				expect(stubs.dbQuery.calledBefore(stubs.renewValues)).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.renewValues.calledOnce).to.be.true;
				expect(result).to.deep.eq(instance);
				done();
			});
		});

	});

	describe('create method', () => {

		it('will return call to dbQuery to create', done => {
			instance = createInstance();
			instance.create().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq({});
				done();
			});
		});

	});

	describe('edit method', () => {

		it('will get edit data then return renewed instance', done => {
			instance = createInstance();
			instance.edit().then(result => {
				expect(stubs.dbQuery.calledBefore(stubs.renewValues)).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.renewValues.calledOnce).to.be.true;
				expect(result).to.deep.eq(instance);
				done();
			});
		});

	});

	describe('update method', () => {

		context('valid data', () => {

			it('will update then return renewed instance', done => {
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
						stubs.dbQuery,
						stubs.renewValues
					);
					expect(instance.validate.calledOnce).to.be.true;
					expect(stubs.verifyErrorPresence.calledTwice).to.be.true;
					expect(instance.validateUpdateInDb.calledOnce).to.be.true;
					expect(stubs.dbQuery.calledTwice).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

		context('invalid data', () => {

			context('initial validation errors caused by values submitted', () => {

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
						expect(stubs.renewValues.notCalled).to.be.true;
						expect(result).to.deep.eq(instance);
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
						expect(stubs.renewValues.notCalled).to.be.true;
						expect(result).to.deep.eq(instance);
						done();
					});
				});

			});

		});

	});

	describe('delete method', () => {

		context('no dependent associations', () => {

			it('will delete then return renewed instance', done => {
				instance = createInstance();
				sinon.spy(instance, 'validateDeleteInDb');
				sinon.spy(instance, 'getShowData');
				instance.delete().then(result => {
					sinon.assert.callOrder(
						instance.validateDeleteInDb,
						stubs.dbQuery,
						stubs.verifyErrorPresence,
						stubs.dbQuery,
						stubs.renewValues
					);
					expect(instance.validateDeleteInDb.calledOnce).to.be.true;
					expect(stubs.dbQuery.calledTwice).to.be.true;
					expect(stubs.verifyErrorPresence.calledOnce).to.be.true;
					expect(instance.getShowData.notCalled).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

		context('dependent associations', () => {

			it('will return instance without deleting', done => {
				const verifyErrorPresenceStub = sinon.stub().returns(true);
				instance = createInstance({
					verifyErrorPresence: verifyErrorPresenceStub
				});
				sinon.spy(instance, 'validateDeleteInDb');
				sinon.spy(instance, 'getShowData');
				instance.delete().then(result => {
					sinon.assert.callOrder(
						instance.validateDeleteInDb,
						stubs.dbQuery,
						verifyErrorPresenceStub,
						stubs.dbQuery,
						instance.getShowData
					);
					expect(stubs.dbQuery.calledTwice).to.be.true;
					expect(instance.getShowData.calledOnce).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

	});

	describe('show method', () => {

		it('will call getShowData method once', done => {
			instance = createInstance();
			sinon.spy(instance, 'getShowData');
			instance.show().then(() => {
				expect(instance.getShowData.calledOnce).to.be.true;
				done();
			});
		});

	});

	describe('list method', () => {

		it('will get list data then return array of instances', done => {
			const dbQueryListStub = sinon.stub().resolves(dbQueryListFixture);
			const subject = createSubject({ dbQuery: dbQueryListStub, Theatre: sinon.stub() });
			subject.list().then(result => {
				instance = new subject(dbQueryListFixture.theatres[0])
				expect(dbQueryListStub.calledOnce).to.be.true;
				expect(result).to.deep.eq([instance]);
				done();
			});
		});

	});

});
