const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Production = require('../../../server/models/production');

const alertFixture = require('../../fixtures/alert');
const dataListFixture = require('../../fixtures/data-list');
const instanceFixture = require('../../fixtures/productions/instance');
const pageDataFixture = require('../../fixtures/productions/page-data');

const err = new Error('errorText');

const stubs = {
	alert: sinon.stub().returns('alertStub')
};

const resetStubs = () => {

	stubs.alert.reset();

};

beforeEach(function () {

	resetStubs();

});

let action;
let method;
let methodStub;
let getPageDataStub;
let request;
let response;
let next;

const createSubject = (stubs) =>
	proxyquire('../../../server/controllers/productions', {
		'../models/production': stubs.ProductionModel,
		'../lib/get-page-data': stubs.getPageData
	});

const createInstance = (action, method, methodStub) => {

	request = httpMocks.createRequest({ flash: stubs.alert });

	response = httpMocks.createResponse();

	next = sinon.stub();

	const ProductionModel = (function (method) {
		switch (method) {
			case 'new':
				return methodStub;
			case 'list':
				return sinon.stub(Production, 'list', function () { return methodStub });
			default:
				return function () { this[method] = methodStub; };
		}
	}) (method);

	getPageDataStub = sinon.stub().returns(pageDataFixture(action));

	const subject = createSubject({ ProductionModel, getPageData: getPageDataStub });

	return subject[method](request, response, next);

};

describe('Production controller', () => {

	describe('new method', () => {

		beforeEach(function () {
			action = 'create';
			method = 'new';
		});

		it('will call getPageData function once', () => {
			methodStub = sinon.stub().returns(instanceFixture());
			createInstance(action, method, methodStub);
			expect(getPageDataStub.calledOnce).to.be.true;
		});

		it('will return status code 200 (OK) and render \'productions/form\' view', () => {
			methodStub = sinon.stub().returns(instanceFixture());
			createInstance(action, method, methodStub);
			expect(response.statusCode).to.eq(200);
			expect(response._getRenderView()).to.eq('productions/form');
			expect(response._getRenderData()).to.deep.eq(
				{ page: pageDataFixture(action), production: instanceFixture() }
			);
		});

	});

	describe('create method', () => {

		beforeEach(function () {
			action = method = 'create';
		});

		it('will call getPageData function once', done => {
			methodStub = sinon.stub().resolves(instanceFixture());
			createInstance(action, method, methodStub).then(() => {
				expect(getPageDataStub.calledOnce).to.be.true;
				done();
			});
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect to instance)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/productions/1');
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 200 (OK) and render \'productions/form\' view', done => {
				methodStub = sinon.stub().resolves(instanceFixture({ hasError: true }));
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('productions/form');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign({
							page: pageDataFixture(action),
							production: instanceFixture({ hasError: true }),
							alert: alertFixture
						})
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will not call getPageData function', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(getPageDataStub.notCalled).to.be.true;
					done();
				});
			});

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('edit method', () => {

		beforeEach(function () {
			action = 'update';
			method = 'edit';
		});

		it('will call getPageData function once', done => {
			methodStub = sinon.stub().resolves(instanceFixture());
			createInstance(action, method, methodStub).then(() => {
				expect(getPageDataStub.calledOnce).to.be.true;
				done();
			});
		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'productions/form\' view', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('productions/form');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign({
							page: pageDataFixture(action),
							production: instanceFixture()
						})
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will not call getPageData function', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(getPageDataStub.notCalled).to.be.true;
					done();
				});
			});

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('update method', () => {

		beforeEach(function () {
			action = method = 'update';
		});

		it('will call getPageData function once', done => {
			methodStub = sinon.stub().resolves(instanceFixture());
			createInstance(action, method, methodStub).then(() => {
				expect(getPageDataStub.calledOnce).to.be.true;
				done();
			});
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect to instance)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/productions/1');
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 200 (OK) and render \'productions/form\' view', done => {
				methodStub = sinon.stub().resolves(instanceFixture({ hasError: true }));
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('productions/form');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign({
							page: pageDataFixture(action),
							production: instanceFixture({ hasError: true }),
							alert: alertFixture
						})
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will not call getPageData function', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(getPageDataStub.notCalled).to.be.true;
					done();
				});
			});

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('delete method', () => {

		beforeEach(function () {
			action = method = 'delete';
		});

		it('will call getPageData function once', done => {
			methodStub = sinon.stub().resolves(instanceFixture());
			createInstance(action, method, methodStub).then(() => {
				expect(getPageDataStub.calledOnce).to.be.true;
				done();
			});
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect to root)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/');
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 302 (redirect to instance)', done => {
				methodStub = sinon.stub().resolves(instanceFixture({ hasError: true }));
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/productions/1');
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will not call getPageData function', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(getPageDataStub.notCalled).to.be.true;
					done();
				});
			});

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('show method', () => {

		beforeEach(function () {
			action = method = 'show';
		});

		it('will call getPageData function once', done => {
			methodStub = sinon.stub().resolves(instanceFixture());
			createInstance(action, method, methodStub).then(() => {
				expect(getPageDataStub.calledOnce).to.be.true;
				done();
			});
		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'productions/show\' view', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('productions/show');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign({
							page: pageDataFixture(action),
							production: instanceFixture(),
							alert: alertFixture
						})
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will not call getPageData function', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(getPageDataStub.notCalled).to.be.true;
					done();
				});
			});

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('list method', () => {

		beforeEach(function () {
			method = 'list';
		});

		afterEach(function () {
			Production.list.restore();
		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'productions/list\' view', done => {
				methodStub = Promise.resolve(dataListFixture);
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('productions/list');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign({
							page: { documentTitle: ' | Home', title: 'Productions' },
							productions: dataListFixture,
							alert: alertFixture
						})
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = Promise.reject(err);
				createInstance(action, method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

});
