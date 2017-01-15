const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Production = require('../../../server/models/production');

const theatreInstanceFixture = require('../../fixtures/theatres/instance');
const pageDataFixture = require('../../fixtures/page-data');
const queryFixture = require('../../fixtures/query');

const stubs = {
	query: sinon.stub().resolves(queryFixture),
	getPageData: sinon.stub().returns(pageDataFixture),
	renewTopLevelValues: sinon.stub().returns(theatreInstanceFixture),
	sqlTemplates: {
		checkIfExists: sinon.stub(),
		insertIfNotExists: sinon.stub(),
		select: sinon.stub(),
		update: sinon.stub(),
		delete: sinon.stub()
	},
	trimStrings: sinon.stub().returns(theatreInstanceFixture),
	validateString: sinon.stub().returns([]),
	verifyErrorPresence: sinon.stub().returns(false),
	Production: sinon.stub().returns(sinon.createStubInstance(Production))
};

const resetStubs = () => {
	stubs.query.reset();
	stubs.getPageData.reset();
	stubs.renewTopLevelValues.reset();
	stubs.sqlTemplates.checkIfExists.reset();
	stubs.sqlTemplates.insertIfNotExists.reset();
	stubs.sqlTemplates.select.reset();
	stubs.sqlTemplates.update.reset();
	stubs.sqlTemplates.delete.reset();
	stubs.trimStrings.reset();
	stubs.validateString.reset();
	stubs.verifyErrorPresence.reset();
	stubs.Production.reset();
};

beforeEach(function () {
	resetStubs();
});

let instance;

function createSubject (stubOverrides) {
	return proxyquire('../../../server/models/theatre', {
		'../../database/query': stubOverrides.query || stubs.query,
		'../lib/get-page-data': stubs.getPageData,
		'../lib/renew-top-level-values': stubs.renewTopLevelValues,
		'../lib/sql-templates': stubs.sqlTemplates,
		'../lib/trim-strings': stubs.trimStrings,
		'../lib/validate-string': stubOverrides.validateString || stubs.validateString,
		'../lib/verify-error-presence': stubOverrides.verifyErrorPresence || stubs.verifyErrorPresence,
		'./production': stubs.Production
	});
};

function createInstance (stubOverrides = {}) {
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

	describe('validateInDb method', () => {

		context('valid data (no results returned that indicate name already exists)', () => {

			it('will not add properties to errors property', done => {
				instance = createInstance({ query: sinon.stub().resolves([]) });
				instance.validateInDb().then(() => {
					expect(instance.errors).not.to.have.property('name');
					expect(instance.errors).to.deep.eq({});
					done();
				});
			});

		});

		context('invalid data (result returned that indicate name already exists)', () => {

			it('will add properties that are arrays to errors property', done => {
				instance = createInstance();
				instance.validateInDb().then(() => {
					expect(instance.errors)
						.to.have.property('name')
						.that.is.an('array')
						.that.deep.eq(['Name already exists']);
					done();
				});
			});

		});

	});

	describe('renewValues method', () => {

		it('will call renew top level values module', () => {
			instance = createInstance();
			instance.renewValues();
			expect(stubs.renewTopLevelValues.calledOnce).to.be.true;
		});

		context('props argument contains productions property', () => {

			it('will set instance productions property as array of Production instances', () => {
				instance = createInstance();
				instance.renewValues({ productions: [{}] });
				expect(instance.productions).to.deep.eq([{}]);
				expect(instance.productions[0].constructor.name).to.eq('Production');
			});

		});

		context('props argument does not contain productions property', () => {

			it('will retain instance productions property as empty array', () => {
				instance = createInstance();
				instance.renewValues();
				expect(instance.productions).to.deep.eq([]);
			});

		});

	});

	describe('create method', () => {

		it('will call query then return page and query result data', done => {
			instance = createInstance();
			instance.create().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq(queryFixture);
				done();
			});
		});

	});

	describe('edit method', () => {

		it('will call getPageData function once', done => {
			instance = createInstance();
			instance.edit().then(() => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = createInstance();
			instance.edit().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
				done();
			});
		});

	});

	describe('update method', () => {

		it('will do validation before database validation', done => {
			instance = createInstance();
			sinon.spy(instance, 'validate');
			sinon.spy(instance, 'validateInDb');
			instance.update().then(() => {
				expect(instance.validate.calledBefore(instance.validateInDb)).to.be.true;
				expect(instance.validateInDb.calledOnce).to.be.true;
				done();
			});
		});

		context('valid data', () => {

			it('will call getPageData function once', done => {
				instance = createInstance();
				instance.update().then(() => {
					expect(stubs.getPageData.calledOnce).to.be.true;
					expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
					done();
				});
			});

			it('will call query twice then return page and query result data', done => {
				instance = createInstance();
				instance.update().then(result => {
					expect(stubs.query.calledTwice).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, theatre: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			context('initial validation errors caused by values submitted', () => {

				it('will call getPageData function once', done => {
					instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
					instance.update().then(() => {
						expect(stubs.getPageData.calledOnce).to.be.true;
						expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
						done();
					});
				});

				it('will return page and theatre data without calling query', done => {
					instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
					instance.update().then(result => {
						expect(stubs.query.called).to.be.false;
						expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
						done();
					});
				});

			});

			context('secondary validation errors caused by database checks', () => {

				it('will call getPageData function once', done => {
					const verifyErrorPresenceStub = sinon.stub();
					verifyErrorPresenceStub.onFirstCall().returns(false).onSecondCall().returns(true);
					instance = createInstance({ verifyErrorPresence: verifyErrorPresenceStub });
					instance.update().then(() => {
						expect(stubs.getPageData.calledOnce).to.be.true;
						expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
						done();
					});
				});

				it('will return page and theatre data only calling query once (for DB validation)', done => {
					const verifyErrorPresenceStub = sinon.stub();
					verifyErrorPresenceStub.onFirstCall().returns(false).onSecondCall().returns(true);
					instance = createInstance({ verifyErrorPresence: verifyErrorPresenceStub });
					instance.update().then(result => {
						expect(stubs.query.calledOnce).to.be.true;
						expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
						done();
					});
				});

			});

		});

	});

	describe('delete method', () => {

		it('will call getPageData function once', done => {
			instance = createInstance();
			instance.delete().then(() => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'delete')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = createInstance();
			instance.delete().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
				done();
			});
		});

	});

	describe('show method', () => {

		it('will call getPageData function once', done => {
			instance = createInstance();
			instance.show().then(() => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'show')).to.be.true;
				done();
			});
		});

		it('will call query twice then return page and query result data', done => {
			instance = createInstance();
			instance.show().then(result => {
				expect(stubs.query.calledTwice).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
				done();
			});
		});

	});

	describe('list method', () => {

		it('will call query then return query result data as array', done => {
			const subject = createSubject({ Theatre: sinon.stub() });
			subject.list().then(result => {
				instance = new subject(queryFixture[0])
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ theatres: [instance] });
				done();
			});
		});

	});

});
