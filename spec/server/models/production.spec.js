const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const dbQueryFixture = require('../../fixtures/db-query');

const sandbox = sinon.sandbox.create();

let stubs;
let instance;

const RoleStub = function () {

	this.validate = sinon.stub();

}

const PersonStub = function () {

	this.roles = [new RoleStub];
	this.validate = sinon.stub();

};

const PlaytextStub = function () {

	this.validate = sinon.stub();

};

const TheatreStub = function () {

	this.validate = sinon.stub();

};

beforeEach(() => {

	stubs = {
		dbQuery: sandbox.stub().resolves(dbQueryFixture),
		cypherTemplatesProduction: {
			getCreateQuery: sandbox.stub().returns('getCreateQuery response'),
			getEditQuery: sandbox.stub().returns('getEditQuery response'),
			getUpdateQuery: sandbox.stub().returns('getUpdateQuery response'),
			getShowQuery: sandbox.stub().returns('getShowQuery response')
		},
		cypherTemplatesShared: {
			getDeleteQuery: sandbox.stub().returns('getDeleteQuery response'),
			getListQuery: sandbox.stub().returns('getListQuery response')
		},
		prepareAsParams: sandbox.stub().returns('prepareAsParams response'),
		trimStrings: sandbox.stub(),
		validateString: sandbox.stub().returns([]),
		verifyErrorPresence: sandbox.stub().returns(false)
	};

	instance = createInstance();

});

afterEach(() => {

	sandbox.restore();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/models/production', {
		'../database/db-query': stubs.dbQuery,
		'../lib/cypher-templates/production': stubs.cypherTemplatesProduction,
		'../lib/cypher-templates/shared': stubs.cypherTemplatesShared,
		'../lib/prepare-as-params': stubs.prepareAsParams,
		'../lib/trim-strings': stubs.trimStrings,
		'../lib/validate-string': stubOverrides.validateString || stubs.validateString,
		'../lib/verify-error-presence': stubOverrides.verifyErrorPresence || stubs.verifyErrorPresence,
		'./person': PersonStub,
		'./playtext': PlaytextStub,
		'./theatre': TheatreStub
	});

const createInstance = (stubOverrides = {}) => {

	const subject = createSubject(stubOverrides);

	return new subject({ title: 'Hamlet', cast: [{ name: 'Patrick Stewart' }] });

};

describe('Production model', () => {

	describe('validate method', () => {

		it('will trim strings before validating title', () => {

			instance.validate();
			expect(stubs.trimStrings.calledBefore(stubs.validateString)).to.be.true;
			expect(stubs.trimStrings.calledOnce).to.be.true;
			expect(stubs.trimStrings.calledWithExactly(instance)).to.be.true;
			expect(stubs.validateString.calledOnce).to.be.true;
			expect(stubs.validateString.calledWithExactly(instance.title, 'Title', {})).to.be.true;

		});

		context('valid data', () => {

			it('will not add properties to errors property', () => {


				instance.validate();
				expect(instance.errors).not.to.have.property('title');
				expect(instance.errors).to.deep.eq({});

			});

		});

		context('invalid data', () => {

			it('will add properties that are arrays to errors property', () => {

				instance = createInstance({ validateString: sinon.stub().returns(['Title is too short']) });
				instance.validate();
				expect(instance.errors)
					.to.have.property('title')
					.that.is.an('array')
					.that.deep.eq(['Title is too short']);

			});

		});

	});

	describe('setErrorStatus method', () => {

		it('will call instance validate method, theatre + person validate methods then verifyErrorPresence', () => {

			sinon.spy(instance, 'validate');
			instance.setErrorStatus();
			sinon.assert.callOrder(
				instance.validate.withArgs({ required: true }),
				instance.theatre.validate.withArgs({ required: true }),
				instance.playtext.validate.withArgs(),
				instance.cast[0].validate.withArgs(),
				instance.cast[0].roles[0].validate.withArgs(),
				stubs.verifyErrorPresence.withArgs(instance)
			);
			expect(instance.validate.calledOnce).to.be.true;
			expect(instance.theatre.validate.calledOnce).to.be.true;
			expect(instance.playtext.validate.calledOnce).to.be.true;
			expect(instance.cast[0].validate.calledOnce).to.be.true;
			expect(instance.cast[0].roles[0].validate.calledOnce).to.be.true;
			expect(stubs.verifyErrorPresence.calledOnce).to.be.true;

		});

		context('valid data', () => {

			it('will set instance hasError property to false and return same value', () => {


				expect(instance.setErrorStatus()).to.be.false;
				expect(instance.hasError).to.be.false;

			});

		});

		context('invalid data', () => {

			it('will set instance hasError property to true and return same value', () => {

				instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
				expect(instance.setErrorStatus()).to.be.true;
				expect(instance.hasError).to.be.true;

			});

		});

	});

	describe('create method', () => {

		context('valid data', () => {

			it('will create', done => {


				sinon.spy(instance, 'setErrorStatus');
				instance.create().then(result => {
					expect(instance.setErrorStatus.calledBefore(stubs.dbQuery)).to.be.true;
					expect(instance.setErrorStatus.calledOnce).to.be.true;
					expect(instance.setErrorStatus.calledWithExactly()).to.be.true;
					expect(stubs.cypherTemplatesProduction.getCreateQuery.calledOnce).to.be.true;
					expect(stubs.cypherTemplatesProduction.getCreateQuery.calledWithExactly()).to.be.true;
					expect(stubs.dbQuery.calledOnce).to.be.true;
					expect(stubs.dbQuery.calledWithExactly(
						{ query: 'getCreateQuery response', params: 'prepareAsParams response' }
					)).to.be.true;
					expect(result).to.deep.eq(dbQueryFixture);
					done();
				});

			});

		});

		context('invalid data', () => {

			it('will return instance without creating', done => {

				instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
				sinon.spy(instance, 'setErrorStatus');
				instance.create().then(result => {
					expect(instance.setErrorStatus.calledOnce).to.be.true;
					expect(stubs.cypherTemplatesShared.getDeleteQuery.notCalled).to.be.true;
					expect(stubs.dbQuery.notCalled).to.be.true;
					expect(result).to.deep.eq({ production: instance });
					done();
				});

			});

		});

	});

	describe('edit method', () => {

		it('will get edit data', done => {

			instance.edit().then(result => {
				expect(stubs.cypherTemplatesProduction.getEditQuery.calledOnce).to.be.true;
				expect(stubs.cypherTemplatesProduction.getEditQuery.calledWithExactly()).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.dbQuery.calledWithExactly(
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


				sinon.spy(instance, 'setErrorStatus');
				instance.update().then(result => {
					expect(instance.setErrorStatus.calledBefore(stubs.dbQuery)).to.be.true;
					expect(instance.setErrorStatus.calledOnce).to.be.true;
					expect(instance.setErrorStatus.calledWithExactly()).to.be.true;
					expect(stubs.cypherTemplatesProduction.getUpdateQuery.calledOnce).to.be.true;
					expect(stubs.cypherTemplatesProduction.getUpdateQuery.calledWithExactly()).to.be.true;
					expect(stubs.dbQuery.calledOnce).to.be.true;
					expect(stubs.dbQuery.calledWithExactly(
						{ query: 'getUpdateQuery response', params: 'prepareAsParams response' }
					)).to.be.true;
					expect(result).to.deep.eq(dbQueryFixture);
					done();
				});

			});

		});

		context('invalid data', () => {

			it('will return instance without updating', done => {

				instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
				sinon.spy(instance, 'setErrorStatus');
				instance.update().then(result => {
					expect(instance.setErrorStatus.calledOnce).to.be.true;
					expect(instance.setErrorStatus.calledWithExactly()).to.be.true;
					expect(stubs.cypherTemplatesProduction.getCreateQuery.notCalled).to.be.true;
					expect(stubs.dbQuery.notCalled).to.be.true;
					expect(result).to.deep.eq({ production: instance });
					done();
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
				expect(stubs.cypherTemplatesProduction.getShowQuery.calledOnce).to.be.true;
				expect(stubs.cypherTemplatesProduction.getShowQuery.calledWithExactly()).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.dbQuery.calledWithExactly(
					{ query: 'getShowQuery response', params: instance }
				)).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

	describe('list method', () => {

		it('will get list data', done => {

			const subject = createSubject();
			subject.list().then(result => {
				expect(stubs.cypherTemplatesShared.getListQuery.calledOnce).to.be.true;
				expect(stubs.cypherTemplatesShared.getListQuery.calledWithExactly('production')).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.dbQuery.calledWithExactly({ query: 'getListQuery response' })).to.be.true;
				expect(result).to.deep.eq(dbQueryFixture);
				done();
			});

		});

	});

});
