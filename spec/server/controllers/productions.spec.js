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

const alertStub = sinon.stub().returns('alertStub');

const resetStubs = () => {

	alertStub.reset();

};

beforeEach(function () {

	resetStubs();

});

let action;
let method;
let methodStub;
let request;
let response;
let next;

const createSubject = (method, stubs) =>
	proxyquire(`../../../server/controllers/productions/${method}`, {
		'../../models/production': stubs.ProductionModel,
		'../../lib/get-page-data': stubs.getPageData
	});

const createInstance = (action, method, methodStub) => {

	request = httpMocks.createRequest({ flash: alertStub });

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

	const getPageData = sinon.stub().returns(pageDataFixture(action));

	const subject = createSubject(method, { ProductionModel, getPageData });

	return subject(request, response, next);

};

describe('Production controller', () => {

	describe('new method', () => {

		beforeEach(function () {
			action = 'create';
			method = 'new';
		});

		it('will return status code 200 (OK)', () => {
			methodStub = sinon.stub().returns(instanceFixture());
			createInstance(action, method, methodStub);
			expect(response.statusCode).to.eq(200);
			expect(response._getRenderData()).to.deep.eq(
				{ page: pageDataFixture(action), production: instanceFixture() }
			);
		});

	});

	describe('create method', () => {

		beforeEach(function () {
			action = method = 'create';
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect to instance)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/productions/1');
					expect(response._getRenderData()).to.deep.eq({});
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(instanceFixture({ hasError: true }));
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
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

		context('resolves with data', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
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

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect to instance)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/productions/1');
					expect(response._getRenderData()).to.deep.eq({});
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(instanceFixture({ hasError: true }));
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
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

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect to root)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/');
					expect(response._getRenderData()).to.deep.eq({});
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
					expect(response._getRenderData()).to.deep.eq({});
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

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

		context('resolves with data', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
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

			it('will return status code 200 (OK)', done => {
				methodStub = Promise.resolve(dataListFixture);
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderData()).to.deep.eq(
						Object.assign({
							page: { title: 'Productions' },
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
