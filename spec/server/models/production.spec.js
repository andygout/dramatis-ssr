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
	renewValues: sinon.stub(),
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

beforeEach(function () {

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

	describe('create method', () => {

		context('valid data', () => {

			it('will call dbQuery to create then return renewed instance', done => {
				instance = createInstance();
				instance.create().then(result => {
					expect(stubs.dbQuery.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will return instance without calling dbQuery to create', done => {
				instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
				instance.create().then(result => {
					expect(stubs.dbQuery.called).to.be.false;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

	});

	describe('edit method', () => {

		it('will call dbQuery to get edit data then return renewed instance', done => {
			instance = createInstance();
			instance.edit().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq(instance);
				done();
			});
		});

	});

	describe('update method', () => {

		context('valid data', () => {

			it('will call dbQuery to update then return renewed instance', done => {
				instance = createInstance();
				instance.update().then(result => {
					expect(stubs.dbQuery.calledOnce).to.be.true;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will return instance without calling dbQuery to update', done => {
				instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
				instance.update().then(result => {
					expect(stubs.dbQuery.called).to.be.false;
					expect(result).to.deep.eq(instance);
					done();
				});
			});

		});

	});

	describe('delete method', () => {

		it('will call dbQuery to delete then return renewed instance', done => {
			instance = createInstance();
			instance.delete().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq(instance);
				done();
			});
		});

	});

	describe('show method', () => {

		it('will call dbQuery to get show data then return renewed instance', done => {
			instance = createInstance();
			instance.show().then(result => {
				expect(stubs.dbQuery.calledOnce).to.be.true;
				expect(result).to.deep.eq(instance);
				done();
			});
		});

	});

	describe('list method', () => {

		it('will call dbQuery to get list data then return array of instances', done => {
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
