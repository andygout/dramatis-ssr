const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const productionInstanceFixture = require('../../fixtures/productions/instance');
const pageDataFixture = require('../../fixtures/page-data');
const queryFixture = require('../../fixtures/query');

const TheatreStub = function () {
	this.validate = sinon.stub();
	this.create = sinon.stub().resolves(queryFixture);
};

const stubs = {
	format: {
		literal: sinon.stub().returns('pg-formatted value')
	},
	query: sinon.stub().resolves(queryFixture),
	pgFormatValues: sinon.stub().returns(productionInstanceFixture),
	renewValues: sinon.stub().returns(productionInstanceFixture),
	trimStrings: sinon.stub().returns(productionInstanceFixture),
	validateString: sinon.stub().returns([]),
	getPageData: sinon.stub().returns(pageDataFixture),
	Theatre: TheatreStub
};

const resetStubs = () => {
	stubs.format.literal.reset();
	stubs.query.reset();
	stubs.pgFormatValues.reset();
	stubs.renewValues.reset();
	stubs.trimStrings.reset();
	stubs.validateString.reset();
	stubs.getPageData.reset();
};

beforeEach(function() {
	resetStubs();
});

describe('Production model', () => {

	let instance;

	function createSubject (stubOverrides) {
		return proxyquire('../../../server/models/production', {
			'pg-format': stubs.format,
			'../../database/query': stubs.query,
			'../lib/pg-format-values': stubs.pgFormatValues,
			'../lib/renew-values': stubs.renewValues,
			'../lib/trim-strings': stubs.trimStrings,
			'../lib/validate-string': stubOverrides.validateString || stubs.validateString,
			'../lib/verify-error-presence': sinon.stub().returns(stubOverrides.verifyErrorPresence || false),
			'../lib/page-data': stubs.getPageData,
			'./theatre': stubOverrides.Theatre || stubs.Theatre
		});
	}

	function createInstance (stubOverrides = {}) {
		const subject = createSubject(stubOverrides);
		return new subject();
	}

	describe('validate method', () => {

		it('will add errors property to class instance', () => {
			instance = createInstance();
			expect(instance).not.to.have.property('errors');
			instance.validate();
			expect(instance).to.have.property('errors');
		});

		it('will trim strings before validating title', () => {
			instance = createInstance();
			instance.validate();
			expect(stubs.trimStrings.calledBefore(stubs.validateString)).to.be.true;
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

	describe('new method', () => {

		it('will call pageData function once', () => {
			instance = createInstance();
			instance.new();
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
		});

		it('will return page and production data', () => {
			instance = createInstance();
			expect(instance.new()).to.deep.eq({ page: pageDataFixture, production: instance });
		});

	});

	describe('create method', () => {

		context('valid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance();
				instance.create();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = createInstance();
				instance.create().then(result => {
					expect(stubs.query.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, production: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance({ verifyErrorPresence: true });
				instance.create();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will return page and production data without calling query', done => {
				instance = createInstance({ verifyErrorPresence: true });
				instance.create().then(result => {
					expect(stubs.query.called).to.be.false;
					expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
					done();
				});
			});

		});

	});

	describe('edit method', () => {

		it('will call pageData function once', done => {
			instance = createInstance();
			instance.edit().then(result => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = createInstance();
			instance.edit().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('update method', () => {

		context('valid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance();
				instance.update();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = createInstance();
				instance.update().then(result => {
					expect(stubs.query.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, production: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance({ verifyErrorPresence: true });
				instance.update();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will return page and production data without calling query', done => {
				instance = createInstance({ verifyErrorPresence: true });
				instance.update().then(result => {
					expect(stubs.query.called).to.be.false;
					expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
					done();
				});
			});

		});

	});

	describe('delete method', () => {

		it('will call pageData function once', done => {
			instance = createInstance();
			instance.delete().then(result => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'delete')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = createInstance();
			instance.delete().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('show method', () => {

		it('will call pageData function once', done => {
			instance = createInstance();
			instance.show().then(result => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'show')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = createInstance();
			instance.show().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('list method', () => {

		it('will call query then return query result data as array', done => {
			const subject = createSubject({ Theatre: sinon.stub() });
			subject.list().then(result => {
				instance = new subject(queryFixture[0], { hasError: true })
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ productions: [instance] });
				done();
			});
		});

	});

});
