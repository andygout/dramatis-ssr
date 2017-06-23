const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const Role = require('../../../dist/models/role');

const dbQueryFixture = require('../../fixtures/db-query');

const sandbox = sinon.sandbox.create();

let stubs;
let instance;

const RoleStub = function () {

	return sinon.createStubInstance(Role);

};

beforeEach(() => {

	stubs = {
		dbQuery: sandbox.stub().resolves(dbQueryFixture),
		cypherTemplatesShared: {
			getDeleteQuery: sandbox.stub().returns('getDeleteQuery response')
		},
		cypherTemplatesPerson: {
			getShowQuery: sandbox.stub().returns('getShowQuery response')
		},
		Base: {
			dbQuery: sandbox.stub().resolves(dbQueryFixture),
			cypherTemplatesShared: {
				getValidateUpdateQuery: sandbox.stub().returns('getValidateUpdateQuery response'),
				getEditQuery: sandbox.stub().returns('getEditQuery response'),
				getUpdateQuery: sandbox.stub().returns('getUpdateQuery response')
			},
			trimStrings: sandbox.stub(),
			validateString: sandbox.stub().returns([]),
			verifyErrorPresence: sandbox.stub().returns(false)
		},
		Role: RoleStub
	};

	instance = createInstance();

});

afterEach(() => {

	sandbox.restore();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/models/person', {
		'../database/db-query': stubOverrides.dbQuery || stubs.dbQuery,
		'../lib/cypher-templates/shared': stubs.cypherTemplatesShared,
		'../lib/cypher-templates/person': stubs.cypherTemplatesPerson,
		'./base': proxyquire('../../../dist/models/base', {
			'../database/db-query': stubOverrides.Base && stubOverrides.Base.dbQuery || stubs.Base.dbQuery,
			'../lib/cypher-templates/shared': stubs.Base.cypherTemplatesShared,
			'../lib/trim-strings': stubs.Base.trimStrings,
			'../lib/validate-string': stubs.Base.validateString,
			'../lib/verify-error-presence': stubOverrides.Base && stubOverrides.Base.verifyErrorPresence || stubs.Base.verifyErrorPresence
		}),
		'./role': stubs.Role
	});

const createInstance = (stubOverrides = {}) => {

	const subject = createSubject(stubOverrides);

	return new subject({ name: 'Ian McKellen' });

};

describe('Person model', () => {

	describe('validateUpdateInDb method', () => {

		it('will validate update in database', done => {

			instance.validateUpdateInDb().then(() => {
				expect(stubs.Base.cypherTemplatesShared.getValidateUpdateQuery.calledOnce).to.be.true;
				expect(stubs.Base.cypherTemplatesShared.getValidateUpdateQuery.calledWithExactly(instance.model)).to.be.true;
				expect(stubs.Base.dbQuery.calledOnce).to.be.true;
				expect(stubs.Base.dbQuery.calledWithExactly(
					{ query: 'getValidateUpdateQuery response', params: instance }
				)).to.be.true;
				done();
			});

		});

		context('valid data (results returned that indicate name does not already exist)', () => {

			it('will not add properties to errors property', done => {

				instance = createInstance({ Base: { dbQuery: sinon.stub().resolves({ instanceCount: 0 }) } });
				instance.validateUpdateInDb().then(() => {
					expect(instance.errors).not.to.have.property('name');
					expect(instance.errors).to.deep.eq({});
					done();
				});

			});

		});

		context('invalid data (results returned that indicate name already exists)', () => {

			it('will add properties that are arrays to errors property', done => {

				instance = createInstance({ Base: { dbQuery: sinon.stub().resolves({ instanceCount: 1 }) } });
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

			instance.edit().then(result => {
				expect(stubs.Base.cypherTemplatesShared.getEditQuery.calledOnce).to.be.true;
				expect(stubs.Base.cypherTemplatesShared.getEditQuery.calledWithExactly(instance.model)).to.be.true;
				expect(stubs.Base.dbQuery.calledOnce).to.be.true;
				expect(stubs.Base.dbQuery.calledWithExactly(
					{ query: 'getEditQuery response', params: instance }
				)).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

	describe('update method', () => {

		context('valid data', () => {

			it('will update', done => {

				sinon.spy(instance, 'validate');
				sinon.spy(instance, 'validateUpdateInDb');
				instance.update().then(result => {
					sinon.assert.callOrder(
						instance.validate.withArgs({ required: true }),
						stubs.Base.verifyErrorPresence.withArgs(instance),
						instance.validateUpdateInDb.withArgs(),
						stubs.Base.cypherTemplatesShared.getValidateUpdateQuery.withArgs(instance.model),
						stubs.Base.dbQuery.withArgs({ query: 'getValidateUpdateQuery response', params: instance }),
						stubs.Base.verifyErrorPresence.withArgs(instance),
						stubs.Base.cypherTemplatesShared.getUpdateQuery.withArgs(instance.model),
						stubs.Base.dbQuery.withArgs({ query: 'getUpdateQuery response', params: instance })
					);
					expect(instance.validate.calledOnce).to.be.true;
					expect(stubs.Base.verifyErrorPresence.calledTwice).to.be.true;
					expect(instance.validateUpdateInDb.calledOnce).to.be.true;
					expect(stubs.Base.cypherTemplatesShared.getValidateUpdateQuery.calledOnce).to.be.true;
					expect(stubs.Base.dbQuery.calledTwice).to.be.true;
					expect(stubs.Base.cypherTemplatesShared.getUpdateQuery.calledOnce).to.be.true;
					expect(result).to.deep.eq(dbQueryFixture);
					done();
				});

			});

		});

		context('invalid data', () => {

			context('initial validation errors caused by submitted values', () => {

				it('will return instance without updating', done => {

					const verifyErrorPresenceStub = sinon.stub().returns(true);
					instance = createInstance({ Base: { verifyErrorPresence: verifyErrorPresenceStub } });
					sinon.spy(instance, 'validate');
					sinon.spy(instance, 'validateUpdateInDb');
					instance.update().then(result => {
						expect(instance.validate.calledBefore(verifyErrorPresenceStub)).to.be.true;
						expect(instance.validate.calledOnce).to.be.true;
						expect(instance.validate.calledWithExactly({ required: true })).to.be.true;
						expect(verifyErrorPresenceStub.calledOnce).to.be.true;
						expect(verifyErrorPresenceStub.calledWithExactly(instance)).to.be.true;
						expect(instance.validateUpdateInDb.notCalled).to.be.true;
						expect(stubs.Base.cypherTemplatesShared.getValidateUpdateQuery.notCalled).to.be.true;
						expect(stubs.Base.dbQuery.notCalled).to.be.true;
						expect(stubs.Base.cypherTemplatesShared.getUpdateQuery.notCalled).to.be.true;
						expect(result).to.deep.eq({ person: instance });
						done();
					});

				});

			});

			context('secondary validation errors caused by database checks', () => {

				it('will return instance without updating', done => {

					const verifyErrorPresenceStub = sinon.stub();
					verifyErrorPresenceStub.onFirstCall().returns(false).onSecondCall().returns(true);
					instance = createInstance({ Base: { verifyErrorPresence: verifyErrorPresenceStub } });
					sinon.spy(instance, 'validate');
					sinon.spy(instance, 'validateUpdateInDb');
					instance.update().then(result => {
						sinon.assert.callOrder(
							instance.validate.withArgs({ required: true }),
							verifyErrorPresenceStub.withArgs(instance),
							instance.validateUpdateInDb.withArgs(),
							stubs.Base.cypherTemplatesShared.getValidateUpdateQuery.withArgs(instance.model),
							stubs.Base.dbQuery.withArgs({ query: 'getValidateUpdateQuery response', params: instance }),
							verifyErrorPresenceStub.withArgs(instance)
						);
						expect(instance.validate.calledOnce).to.be.true;
						expect(verifyErrorPresenceStub.calledTwice).to.be.true;
						expect(instance.validateUpdateInDb.calledOnce).to.be.true;
						expect(stubs.Base.cypherTemplatesShared.getValidateUpdateQuery.calledOnce).to.be.true;
						expect(stubs.Base.dbQuery.calledOnce).to.be.true;
						expect(stubs.Base.cypherTemplatesShared.getUpdateQuery.notCalled).to.be.true;
						expect(result).to.deep.eq({ person: instance });
						done();
					});

				});

			});

		});

	});

	describe('delete method', () => {

		it('will delete', done => {

			instance.delete().then(result => {
				expect(stubs.cypherTemplatesShared.getDeleteQuery.calledOnce).to.be.true;
				expect(stubs.cypherTemplatesShared.getDeleteQuery.calledWithExactly(instance.model)).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.dbQuery.calledWithExactly(
					{ query: 'getDeleteQuery response', params: instance }
				)).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

	describe('show method', () => {

		it('will get show data', done => {

			instance.show().then(result => {
				expect(stubs.cypherTemplatesPerson.getShowQuery.calledOnce).to.be.true;
				expect(stubs.cypherTemplatesPerson.getShowQuery.calledWithExactly()).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.dbQuery.calledWithExactly(
					{ query: 'getShowQuery response', params: instance }
				)).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

});
