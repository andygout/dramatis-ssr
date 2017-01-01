const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const theatreInstanceFixture = require('../../fixtures/theatres/instance');
const pageDataFixture = require('../../fixtures/page-data');
const queryFixture = require('../../fixtures/query');

const stubs = {
	format: {
		literal: sinon.stub().returns('pg-formatted value')
	},
	query: sinon.stub().resolves(queryFixture),
	getPageData: sinon.stub().returns(pageDataFixture),
	pgFormatValues: sinon.stub().returns(theatreInstanceFixture),
	renewValues: sinon.stub().returns(theatreInstanceFixture),
	trimStrings: sinon.stub().returns(theatreInstanceFixture),
	validateString: sinon.stub().returns([]),
	verifyErrorPresence: sinon.stub().returns(false),
};

const resetStubs = () => {
	stubs.format.literal.reset();
	stubs.query.reset();
	stubs.getPageData.reset();
	stubs.pgFormatValues.reset();
	stubs.renewValues.reset();
	stubs.trimStrings.reset();
	stubs.validateString.reset();
	stubs.verifyErrorPresence.reset();
};

beforeEach(function() {
	resetStubs();
});

describe('Theatre model', () => {

	let instance;

	function createSubject (stubOverrides) {
		return proxyquire('../../../server/models/theatre', {
			'pg-format': stubs.format,
			'../../database/query': stubs.query,
			'../lib/page-data': stubs.getPageData,
			'../lib/pg-format-values': stubs.pgFormatValues,
			'../lib/renew-values': stubs.renewValues,
			'../lib/trim-strings': stubs.trimStrings,
			'../lib/validate-string': stubOverrides.validateString || stubs.validateString,
			'../lib/verify-error-presence': stubOverrides.verifyErrorPresence || stubs.verifyErrorPresence
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

		it('will trim strings before validating name', () => {
			instance = createInstance();
			instance.validate();
			expect(stubs.trimStrings.calledBefore(stubs.validateString)).to.be.true;
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
				expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
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
					expect(result).to.deep.eq({ page: pageDataFixture, theatre: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance({ verifyErrorPresence: sinon.stub().returns(true) });
				instance.update();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
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
				expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
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
