const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const constants = require('../../../server/lib/constants');

const theatreInstanceFixture = require('../../fixtures/theatres/instance');
const pageDataFixture = require('../../fixtures/page-data');
const queryFixture = require('../../fixtures/query');

const TheatreStub = function () {
	this.validate = sinon.stub();
};

const stubs = {
	format: {
		literal: sinon.stub().returns('pg-formatted value')
	},
	query: sinon.stub().resolves(queryFixture),
	getPageData: sinon.stub().returns(pageDataFixture),
	pgFormatValues: sinon.stub().returns(theatreInstanceFixture),
	trimStrings: sinon.stub().returns(theatreInstanceFixture)
};

const resetStubs = () => {
	stubs.format.literal.reset();
	stubs.query.reset();
	stubs.getPageData.reset();
	stubs.pgFormatValues.reset();
	stubs.trimStrings.reset();
};

beforeEach(function() {
	resetStubs();
});

describe('Theatre model', () => {

	let instance;
	const subMinLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH - 1)}`;
	const surMaxLengthString = `${'a'.repeat(constants.STRING_MAX_LENGTH + 1)}`;
	const validLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH)}`;

	function createSubject (stubOverrides) {
		return proxyquire('../../../server/models/theatre', {
			'pg-format': stubs.format,
			'../../database/query': stubs.query,
			'../lib/page-data': stubs.getPageData,
			'../lib/pg-format-values': stubs.pgFormatValues,
			'../lib/trim-strings': stubs.trimStrings,
			'../lib/verify-error-presence': sinon.stub().returns(stubOverrides.verifyErrorPresence || false)
		});
	}

	function createInstance (props, stubOverrides = {}) {
		const subject = createSubject(stubOverrides);
		return new subject(props);
	}

	describe('validateName method', () => {

		context('valid data', () => {

			it('will not add error to nameErrors array if name string is acceptable length', () => {
				instance = createInstance({ name: validLengthString });
				expect(instance.validateName()).to.deep.eq([]);
			});

		});

		context('invalid data', () => {

			it('will add error to nameErrors array if name string is too short', () => {
				instance = createInstance({ name: subMinLengthString });
				expect(instance.validateName()).to.deep.eq(['Name is too short']);
			});

			it('will add error to nameErrors array if name string is too long', () => {
				instance = createInstance({ name: surMaxLengthString });
				expect(instance.validateName()).to.deep.eq(['Name is too long']);
			});

		});

	});

	describe('validate method', () => {

		it('will add errors property to class instance', () => {
			instance = createInstance({ name: validLengthString });
			expect(instance).not.to.have.property('errors');
			instance.validate();
			expect(instance).to.have.property('errors');
		});

		it('will trim strings before validating name', () => {
			instance = createInstance({ name: validLengthString });
			instance.validate();
			expect(stubs.trimStrings.calledBefore(instance.validateName)).to.be.true;
		});

		context('valid data', () => {

			it('will not add properties to errors property', () => {
				instance = createInstance({ name: validLengthString });
				instance.validate();
				expect(instance.errors).not.to.have.property('name');
				expect(instance.errors).to.deep.eq({});
			});

		});

		context('invalid data', () => {

			it('will add properties that are arrays to errors property', () => {
				instance = createInstance({ name: subMinLengthString });
				instance.validate();
				expect(instance.errors)
					.to.have.property('name')
					.that.is.an('array')
					.that.deep.eq(['Name is too short']);
			});

		});

	});

	describe('renewValues method', () => {

		it('will use arguments to renew property values of instance', () => {
			instance = createInstance({ name: 'foo' });
			instance.renewValues({ name: 'bar' });
			expect(instance.name).to.eq('bar');
		});

		it('will not use arguments to add non-existent properties to instance', () => {
			instance = createInstance({ name: 'foo' });
			instance.renewValues({ nonExistentProperty: 'bar' });
			expect(instance).not.to.have.property('nonExistentProperty');
		});

	});

	describe('new method', () => {

		it('will call pageData function once', () => {
			instance = createInstance();
			instance.new();
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
		});

		it('will return page and theatre data', () => {
			instance = createInstance();
			expect(instance.new()).to.deep.eq({ page: pageDataFixture, theatre: instance });
		});

	});

	describe('create method', () => {

		context('valid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance({ name: validLengthString });
				instance.create();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = createInstance({ name: validLengthString });
				instance.create().then(result => {
					expect(stubs.query.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, theatre: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance({ name: subMinLengthString }, { verifyErrorPresence: true });
				instance.create();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will return page and theatre data without calling query', done => {
				instance = createInstance({ name: subMinLengthString }, { verifyErrorPresence: true });
				instance.create().then(result => {
					expect(stubs.query.called).to.be.false;
					expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
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
				expect(result).to.deep.eq({ page: pageDataFixture, theatre: instance });
				done();
			});
		});

	});

	describe('update method', () => {

		context('valid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance({ name: validLengthString });
				instance.update();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = createInstance({ name: validLengthString });
				instance.update().then(result => {
					expect(stubs.query.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, theatre: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will call pageData function once', () => {
				instance = createInstance({ name: subMinLengthString }, { verifyErrorPresence: true });
				instance.update();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will return page and theatre data without calling query', done => {
				instance = createInstance({ name: subMinLengthString }, { verifyErrorPresence: true });
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
				instance = new subject(queryFixture[0], { hasError: true })
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ theatres: [instance] });
				done();
			});
		});

	});

});
