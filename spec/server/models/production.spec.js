const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const constants = require('../../../server/lib/constants');

const pageDataFixture = require('../../fixtures/page-data');
const queryFixture = require('../../fixtures/query');

const stubs = {
	format: {
		literal: sinon.stub().returns('pg-formatted value')
	},
	query: sinon.stub().resolves(queryFixture),
	getPageData: sinon.stub().returns(pageDataFixture)
};

const subject = proxyquire('../../../server/models/production', {
	'pg-format': stubs.format,
	'../../database/query': stubs.query,
	'../lib/page-data.js': stubs.getPageData
});

const resetStubs = () => {
	stubs.format.literal.reset();
	stubs.query.reset();
	stubs.getPageData.reset();
};

beforeEach(function() {
	resetStubs();
});

describe('Production model', () => {

	let instance;
	const subMinLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH - 1)}`;
	const surMaxLengthString = `${'a'.repeat(constants.STRING_MAX_LENGTH + 1)}`;
	const validLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH)}`;

	describe('trimStrings method', () => {

		it('will trim leading and trailing whitespace from strings', () => {
			instance = new subject({ title: ` ${validLengthString} ` });
			instance.trimStrings();
			expect(instance.title.length).to.eq(constants.STRING_MIN_LENGTH);
		});

	});

	describe('validateTitle method', () => {

		context('valid data', () => {

			it('will not add error to titleErrors array if title string is acceptable length', () => {
				instance = new subject({ title: validLengthString });
				expect(instance.validateTitle()).to.deep.eq([]);
			});

		});

		context('invalid data', () => {

			it('will add error to titleErrors array if title string is too short', () => {
				instance = new subject({ title: subMinLengthString });
				expect(instance.validateTitle()).to.deep.eq(['Title is too short']);
			});

			it('will add error to titleErrors array if title string is too long', () => {
				instance = new subject({ title: surMaxLengthString });
				expect(instance.validateTitle()).to.deep.eq(['Title is too long']);
			});

		});

	});

	describe('validate method', () => {

		it('will add errors property to class instance', () => {
			instance = new subject({ title: validLengthString });
			expect(instance).not.to.have.property('errors');
			instance.validate();
			expect(instance).to.have.property('errors');
		});

		context('valid data', () => {

			it('will not add properties to errors property', () => {
				instance = new subject({ title: validLengthString });
				instance.validate();
				expect(instance.errors).not.to.have.property('title');
				expect(instance.errors).to.deep.eq({});
			});

		});

		context('invalid data', () => {

			it('will add properties that are arrays to errors property', () => {
				instance = new subject({ title: subMinLengthString });
				instance.validate();
				expect(instance.errors)
					.to.have.property('title')
					.that.is.an('array')
					.that.deep.eq(['Title is too short']);
			});

		});

	});

	describe('pgFormatValues method', () => {

		it('will return an object with same keys modified by format.literal() function', () => {
			instance = new subject({ title: validLengthString });
			const instancePgFormatted = instance.pgFormatValues();
			expect(instancePgFormatted).to.be.an('object');
			expect(instancePgFormatted).to.have.property('title').that.eq('pg-formatted value');
			const instanceKeys = Object.keys(instance).sort();
			const instancePgFormattedKeys = Object.keys(instancePgFormatted).sort();
			expect(JSON.stringify(instancePgFormattedKeys)).to.eq(JSON.stringify(instanceKeys));
		});

		it('will not mutate shallow property values of instance', () => {
			instance = new subject({ title: validLengthString });
			expect(instance.pgFormatValues().title).not.to.eq(instance.title);
		});

	});

	describe('renewValues method', () => {

		it('will use arguments to renew property values of instance', () => {
			instance = new subject({ title: 'foo' });
			instance.renewValues({ title: 'bar' });
			expect(instance.title).to.eq('bar');
		});

		it('will not use arguments to add non-existent properties to instance', () => {
			instance = new subject({ title: 'foo' });
			instance.renewValues({ nonExistentProperty: 'bar' });
			expect(instance).not.to.have.property('nonExistentProperty');
		});

	});

	describe('new method', () => {

		it('will call pageData function once', () => {
			instance = new subject();
			instance.new();
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
		});

		it('will return page and production data', () => {
			instance = new subject();
			expect(instance.new()).to.deep.eq({ page: pageDataFixture, production: instance });
		});

	});

	describe('create method', () => {

		context('valid data', () => {

			it('will call pageData function once', () => {
				instance = new subject({ title: validLengthString });
				instance.create();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = new subject({ title: validLengthString });
				instance.create().then(result => {
					expect(stubs.query.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, production: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will call pageData function once', () => {
				instance = new subject({ title: subMinLengthString });
				instance.create();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will return page and production data without calling query', done => {
				instance = new subject({ title: subMinLengthString });
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
			instance = new subject();
			instance.edit().then(result => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = new subject();
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
				instance = new subject({ title: validLengthString });
				instance.update();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = new subject({ title: validLengthString });
				instance.update().then(result => {
					expect(stubs.query.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, production: queryFixture[0] });
					done();
				});
			});

		});

		context('invalid data', () => {

			it('will call pageData function once', () => {
				instance = new subject({ title: subMinLengthString });
				instance.update();
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will return page and production data without calling query', done => {
				instance = new subject({ title: subMinLengthString });
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
			instance = new subject();
			instance.delete().then(result => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'delete')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = new subject();
			instance.delete().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('show method', () => {

		it('will call pageData function once', done => {
			instance = new subject();
			instance.show().then(result => {
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.getPageData.calledWithExactly(instance, 'show')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = new subject();
			instance.show().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('list method', () => {

		it('will call query then return query result data as array', done => {
			subject.list().then(result => {
				expect(stubs.query.calledOnce).to.be.true;
				instance = new subject(queryFixture[0]);
				expect(result).to.deep.eq({ productions: [instance] });
				done();
			});
		});

	});

});
