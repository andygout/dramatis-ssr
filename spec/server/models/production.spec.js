const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const dbQueryListFixture = require('../../fixtures/productions/db-query-list');

const TheatreStub = function () {

	this.validate = sinon.stub();

	this.create = sinon.stub().resolves({});

};

const stubs = {
	dbQuery: sinon.stub().resolves({}),
	renewValues: sinon.stub().returns('renewValues return value'),
	trimStrings: sinon.stub(),
	validateString: sinon.stub().returns([]),
	verifyErrorPresence: sinon.stub().returns(false),
	Theatre: TheatreStub
};

const resetStubs = () => {

	stubs.dbQuery.reset();
	stubs.renewValues.reset();
	stubs.trimStrings.reset();
	stubs.validateString.reset();
	stubs.verifyErrorPresence.reset();

};

beforeEach(() => {

	resetStubs();

});

let instance;

const createSubject = stubOverrides =>
	proxyquire('../../../dist/models/production', {
		'../database/db-query': stubOverrides.dbQuery || stubs.dbQuery,
		'../lib/renew-values': stubs.renewValues,
		'../lib/trim-strings': stubs.trimStrings,
		'../lib/validate-string': stubOverrides.validateString || stubs.validateString,
		'../lib/verify-error-presence': stubOverrides.verifyErrorPresence || stubs.verifyErrorPresence,
		'./theatre': stubOverrides.Theatre || stubs.Theatre
	});

const createInstance = (stubOverrides = {}) => {

	const subject = createSubject(stubOverrides);

	return new subject();

};

describe('Production model', () => {

	describe('validate method', () => {

		it('will trim strings before validating title', () => {
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

		it('will call instance validate method, theatre validate methods then verifyErrorPresence', () => {
			instance = createInstance();
			sinon.spy(instance, 'validate');
			instance.setErrorStatus();
			sinon.assert.callOrder(instance.validate, instance.theatre.validate, stubs.verifyErrorPresence);
			expect(instance.validate.calledOnce).to.be.true;
			expect(instance.theatre.validate.calledOnce).to.be.true;
			expect(stubs.verifyErrorPresence.calledOnce).to.be.true;
		});

		context('valid data', () => {

			it('will set instance hasError property to false and return same value', () => {
				instance = createInstance();
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

			it('will create then return renewed instance', done => {
				instance = createInstance();
				sinon.spy(instance, 'setErrorStatus');
				instance.create().then(result => {
					sinon.assert.callOrder(
						instance.setErrorStatus, instance.theatre.create, stubs.dbQuery, stubs.renewValues
					);
					expect(instance.setErrorStatus.calledOnce).to.be.true;
					expect(instance.theatre.create.calledOnce).to.be.true;
					expect(stubs.dbQuery.calledOnce).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq('renewValues return value');
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
					expect(instance.theatre.create.notCalled).to.be.true;
					expect(stubs.dbQuery.notCalled).to.be.true;
					expect(stubs.renewValues.notCalled).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
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
				expect(result).to.deep.eq('renewValues return value');
				done();
			});
		});

	});

	describe('update method', () => {

		context('valid data', () => {

			it('will update then return renewed instance', done => {
				instance = createInstance();
				sinon.spy(instance, 'setErrorStatus');
				instance.update().then(result => {
					sinon.assert.callOrder(
						instance.setErrorStatus, instance.theatre.create, stubs.dbQuery, stubs.renewValues
					);
					expect(instance.setErrorStatus.calledOnce).to.be.true;
					expect(instance.theatre.create.calledOnce).to.be.true;
					expect(stubs.dbQuery.calledOnce).to.be.true;
					expect(stubs.renewValues.calledOnce).to.be.true;
					expect(result).to.deep.eq('renewValues return value');
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
					expect(instance.theatre.create.notCalled).to.be.true;
					expect(stubs.dbQuery.notCalled).to.be.true;
					expect(stubs.renewValues.notCalled).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

	});

	describe('delete method', () => {

		it('will delete then return renewed instance', done => {
			instance = createInstance();
			instance.delete().then(result => {
				expect(stubs.dbQuery.calledBefore(stubs.renewValues)).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.renewValues.calledOnce).to.be.true;
				expect(result).to.deep.eq('renewValues return value');
				done();
			});
		});

	});

	describe('show method', () => {

		it('will get show data then return renewed instance', done => {
			instance = createInstance();
			instance.show().then(result => {
				expect(stubs.dbQuery.calledBefore(stubs.renewValues)).to.be.true;
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(stubs.renewValues.calledOnce).to.be.true;
				expect(result).to.deep.eq('renewValues return value');
				done();
			});
		});

	});

	describe('list method', () => {

		it('will get list data then return array of instances', done => {
			const dbQueryListStub = sinon.stub().resolves(dbQueryListFixture);
			const subject = createSubject({ dbQuery: dbQueryListStub, Theatre: sinon.stub() });
			subject.list().then(result => {
				instance = new subject(dbQueryListFixture.productions[0])
				expect(dbQueryListStub.calledOnce).to.be.true;
				expect(result).to.deep.eq([instance]);
				done();
			});
		});

	});

});
