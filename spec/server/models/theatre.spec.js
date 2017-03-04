const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Production = require('../../../dist/models/production');

const dbQueryShowFixture = require('../../fixtures/theatres/db-query-show');
const dbQueryShowWithProdsFixture = require('../../fixtures/theatres/db-query-show-with-prods');
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

		it('will call dbQuery to get show data, renewValues, then return renewed instance', done => {
			const dbQueryShowStub = sinon.stub().resolves(dbQueryShowFixture);
			instance = createInstance({ dbQuery: dbQueryShowStub });
			instance.getShowData().then(result => {
				expect(dbQueryShowStub.calledOnce).to.be.true;
				expect(stubs.renewValues.calledOnce).to.be.true;
				expect(result).to.deep.eq(instance);
				done();
			});
		});

		context('dbQuery response contains productions property', () => {

			it('will set instance productions property as array of Production instances', () => {
				instance = createInstance({ dbQuery: sinon.stub().resolves(dbQueryShowWithProdsFixture) });
				instance.getShowData().then(() => {
					expect(instance.productions).to.deep.eq([{}]);
					expect(instance.productions[0].constructor.name).to.eq('Production');
					done();
				});
			});

		});

		context('dbQuery response does not contain productions property', () => {

			it('will retain instance productions property as empty array', () => {
				instance = createInstance({ dbQuery: sinon.stub().resolves(dbQueryShowFixture) });
				instance.getShowData().then(() => {
					expect(instance.productions).to.deep.eq([]);
					done();
				});
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

		it('will call dbQuery to get edit data, renewValues, then renewed instance', done => {
			instance = createInstance();
			instance.edit().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.renewValues.calledOnce).to.be.true;
				expect(result).to.deep.eq(instance);
				done();
			});
		});

	});

	describe('update method', () => {

		it('will do validation before database validation', done => {
			instance = createInstance();
			sinon.spy(instance, 'validate');
			sinon.spy(instance, 'validateUpdateInDb');
			instance.update().then(() => {
				expect(instance.validate.calledBefore(instance.validateUpdateInDb)).to.be.true;
				expect(instance.validateUpdateInDb.calledOnce).to.be.true;
				done();
			});
		});

		context('valid data', () => {

			it('will call dbQuery twice (to validate then update), renewValues, then return renewed instance', done => {
				instance = createInstance();
				instance.update().then(result => {
					expect(stubs.dbQuery.calledTwice).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

		context('invalid data', () => {

			context('initial validation errors caused by values submitted', () => {

				it('will return instance without calling dbQuery to update (or renewValues thereafter)', done => {
					instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
					instance.update().then(result => {
						expect(stubs.dbQuery.called).to.be.false;
						expect(stubs.renewValues.called).to.be.false;
						expect(result).to.deep.eq(instance);
						done();
					});
				});

			});

			context('secondary validation errors caused by database checks', () => {

				it('will return instance having only called dbQuery once (for database validation)', done => {
					const verifyErrorPresenceStub = sinon.stub();
					verifyErrorPresenceStub.onFirstCall().returns(false).onSecondCall().returns(true);
					instance = createInstance({ verifyErrorPresence: verifyErrorPresenceStub });
					instance.update().then(result => {
						expect(stubs.dbQuery.calledOnce).to.be.true;
						expect(result).to.deep.eq(instance);
						done();
					});
				});

			});

		});

	});

	describe('delete method', () => {

		context('no dependent associations', () => {

			it('will call dbQuery twice (to validate then delete), then renewValues', done => {
				instance = createInstance();
				instance.delete().then(result => {
					expect(stubs.dbQuery.calledTwice).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

			it('will not call getShowData method', done => {
				instance = createInstance();
				var getShowDataSpy = sinon.spy(instance, 'getShowData');
				instance.delete().then(() => {
					expect(getShowDataSpy.notCalled).to.be.true;
					done();
				});
			});

		});

		context('dependent associations', () => {

			it('will call dbQuery twice (to validate then in getShowData method), renewValues, then return renewed instance', done => {
				const dbQueryShowStub = sinon.stub().resolves(dbQueryShowFixture);
				instance = createInstance({
					verifyErrorPresence: sinon.stub().returns(true),
					dbQuery: dbQueryShowStub
				});
				instance.delete().then(result => {
					expect(dbQueryShowStub.calledTwice).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

			it('will call getShowData method once', done => {
				instance = createInstance({
					verifyErrorPresence: sinon.stub().returns(true),
					dbQuery: sinon.stub().resolves(dbQueryShowFixture)
				});
				var getShowDataSpy = sinon.spy(instance, 'getShowData');
				instance.delete().then(() => {
					expect(getShowDataSpy.calledOnce).to.be.true;
					done();
				});
			});

		});

	});

	describe('show method', () => {

		it('will call getShowData method once', done => {
			instance = createInstance({ dbQuery: sinon.stub().resolves(dbQueryShowFixture) });
			var getShowDataSpy = sinon.spy(instance, 'getShowData');
			instance.show().then(() => {
				expect(getShowDataSpy.calledOnce).to.be.true;
				done();
			});
		});

	});

	describe('list method', () => {

		it('will call dbQuery to get list data then return array of instances', done => {
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
