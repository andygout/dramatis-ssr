require('../../../setup');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const pageDataFixture = require('../../fixtures/page-data');
const queryFixture = require('../../fixtures/query');

const stubs = {
	query: { default: sinon.stub().resolves(queryFixture) },
	pageData: { getPageData: sinon.stub().returns(pageDataFixture) }
};

const subject = proxyquire('../../../server/models/production', {
	'../../database/query': stubs.query,
	'../lib/page-data.js': stubs.pageData
}).default;

const resetStubs = () => {
	stubs.query.default.reset();
	stubs.pageData.getPageData.reset();
};

beforeEach(function() {
	resetStubs();
});

describe('Production model', () => {

	let instance;

	describe('new method', () => {

		it('will call pageData function once', () => {
			instance = new subject();
			instance.new();
			expect(stubs.pageData.getPageData.calledOnce).to.be.true;
			expect(stubs.pageData.getPageData.calledWithExactly(instance, 'create')).to.be.true;
		});

		it('will return page and production data', () => {
			instance = new subject();
			expect(instance.new()).to.deep.eq({ page: pageDataFixture, production: instance });
		});

	});

	describe('create method', () => {

		describe('valid data', () => {

			it('will call pageData function once', () => {
				instance = new subject({ title: 'Hamlet' });
				instance.create();
				expect(stubs.pageData.getPageData.calledOnce).to.be.true;
				expect(stubs.pageData.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = new subject({ title: 'Hamlet' });
				instance.create().then(result => {
					expect(stubs.query.default.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, production: queryFixture[0] });
					done();
				});
			});

		});

		describe('invalid data', () => {

			it('will call pageData function once', () => {
				instance = new subject({ title: '' });
				instance.create();
				expect(stubs.pageData.getPageData.calledOnce).to.be.true;
				expect(stubs.pageData.getPageData.calledWithExactly(instance, 'create')).to.be.true;
			});

			it('will return page and production data without calling query', done => {
				instance = new subject({ title: '' });
				instance.create().then(result => {
					expect(stubs.query.default.called).to.be.false;
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
				expect(stubs.pageData.getPageData.calledOnce).to.be.true;
				expect(stubs.pageData.getPageData.calledWithExactly(instance, 'update')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = new subject();
			instance.edit().then(result => {
				expect(stubs.query.default.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('update method', () => {

		describe('valid data', () => {

			it('will call pageData function once', () => {
				instance = new subject({ title: 'Hamlet' });
				instance.update();
				expect(stubs.pageData.getPageData.calledOnce).to.be.true;
				expect(stubs.pageData.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will call query then return page and query result data', done => {
				instance = new subject({ title: 'Hamlet' });
				instance.update().then(result => {
					expect(stubs.query.default.calledOnce).to.be.true;
					expect(result).to.deep.eq({ page: pageDataFixture, production: queryFixture[0] });
					done();
				});
			});

		});

		describe('invalid data', () => {

			it('will call pageData function once', () => {
				instance = new subject({ title: '' });
				instance.update();
				expect(stubs.pageData.getPageData.calledOnce).to.be.true;
				expect(stubs.pageData.getPageData.calledWithExactly(instance, 'update')).to.be.true;
			});

			it('will return page and production data without calling query', done => {
				instance = new subject({ title: '' });
				instance.update().then(result => {
					expect(stubs.query.default.called).to.be.false;
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
				expect(stubs.pageData.getPageData.calledOnce).to.be.true;
				expect(stubs.pageData.getPageData.calledWithExactly(instance, 'delete')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = new subject();
			instance.delete().then(result => {
				expect(stubs.query.default.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('show method', () => {

		it('will call pageData function once', done => {
			instance = new subject();
			instance.show().then(result => {
				expect(stubs.pageData.getPageData.calledOnce).to.be.true;
				expect(stubs.pageData.getPageData.calledWithExactly(instance, 'show')).to.be.true;
				done();
			});
		});

		it('will call query then return page and query result data', done => {
			instance = new subject();
			instance.show().then(result => {
				expect(stubs.query.default.calledOnce).to.be.true;
				expect(result).to.deep.eq({ page: pageDataFixture, production: instance });
				done();
			});
		});

	});

	describe('list method', () => {

		it('will call query then return query result data as array', done => {
			subject.list().then(result => {
				expect(stubs.query.default.calledOnce).to.be.true;
				instance = new subject(queryFixture[0]);
				expect(result).to.deep.eq({ productions: [instance] });
				done();
			});
		});

	});

});
