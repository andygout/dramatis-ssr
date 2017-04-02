const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Production = require('../../../dist/models/production');

const getResponseFixture = require('../../fixtures/get-response-instance');
const getResponseListFixture = require('../../fixtures/get-response-instances-list');

const err = new Error('errorText');

let req;
let res;
let next;
let method;
let methodStub;

const stubs = {
	handleModelResponse: sinon.stub(),
	renderPage: sinon.stub()
};

const resetStubs = () => {

	stubs.handleModelResponse.reset();
	stubs.renderPage.reset();

};

beforeEach(() => {

	resetStubs();

});

const createSubject = stubOverrides =>
	proxyquire('../../../dist/controllers/productions', {
		'../models/production': stubOverrides.ProductionModel,
		'../lib/controllers-helpers/handle-model-response': stubs.handleModelResponse,
		'../lib/controllers-helpers/render-page': stubs.renderPage
	});

const createInstance = (method, methodStub) => {

	req = httpMocks.createRequest();
	res = httpMocks.createResponse();

	next = sinon.stub();

	const ProductionModel = (method => {
		switch (method) {
			case 'new':
				return methodStub;
			case 'list':
				return sinon.stub(Production, 'list', function () { return methodStub });
			default:
				return function () { this[method] = methodStub; };
		}
	}) (method);

	const subject = createSubject({ ProductionModel });

	const controllerFunction = `${method}Route`;

	return subject[controllerFunction](req, res, next);

};

describe('Productions controller', () => {

	describe('new method', () => {

		beforeEach(() => {

			method = 'new';

		});

		it('will call renderPage module', () => {

			const ProductionStub = sinon.createStubInstance(Production);
			methodStub = sinon.stub().returns(ProductionStub);
			createInstance(method, methodStub);
			expect(stubs.renderPage.calledOnce).to.be.true;
			expect(stubs.renderPage.calledWithExactly(
				req, res, ProductionStub, 'form', { action: 'create' }
			)).to.be.true;

		});

	});

	describe('create method', () => {

		beforeEach(() => {

			method = 'create';

		});

		context('resolves with data', () => {

			it('will call handleModelResponse module', done => {

				const responseFixture = getResponseFixture('production');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture.production, 'create'
					)).to.be.true;
					expect(next.notCalled).to.be.true;
					done();
				});

			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {

				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.notCalled).to.be.true;
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});

			});

		});

	});

	describe('edit method', () => {

		beforeEach(() => {

			method = 'edit';

		});

		context('resolves with data', () => {

			it('will call renderPage module', done => {

				const responseFixture = getResponseFixture('production');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.renderPage.calledOnce).to.be.true;
					expect(stubs.renderPage.calledWithExactly(
						req, res, responseFixture.production, 'form', { action: 'update' }
					)).to.be.true;
					expect(next.notCalled).to.be.true;
					done();
				});

			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {

				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});

			});

		});

	});

	describe('update method', () => {

		beforeEach(() => {

			method = 'update';

		});

		context('resolves with data', () => {

			it('will call handleModelResponse module', done => {

				const responseFixture = getResponseFixture('production');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture.production, 'update'
					)).to.be.true;
					expect(next.notCalled).to.be.true;
					done();
				});

			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {

				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.notCalled).to.be.true;
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});

			});

		});

	});

	describe('delete method', () => {

		beforeEach(() => {

			method = 'delete';

		});

		context('resolves with data', () => {

			it('will call handleModelResponse module', done => {

				const responseFixture = getResponseFixture('production');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture.production, 'delete'
					)).to.be.true;
					expect(next.notCalled).to.be.true;
					done();
				});

			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {

				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.notCalled).to.be.true;
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});

			});

		});

	});

	describe('show method', () => {

		beforeEach(() => {

			method = 'show';

		});

		context('resolves with data', () => {

			it('will call renderPage module', done => {

				const responseFixture = getResponseFixture('production');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.renderPage.calledOnce).to.be.true;
					expect(stubs.renderPage.calledWithExactly(
						req, res, responseFixture.production, 'show'
					)).to.be.true;
					expect(next.notCalled).to.be.true;
					done();
				});

			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {

				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});

			});

		});

	});

	describe('list method', () => {

		beforeEach(() => {

			method = 'list';

		});

		afterEach(() => {

			Production.list.restore();

		});

		context('resolves with data', () => {

			it('will call renderPage module', done => {

				const responseListFixture = getResponseListFixture('productions');
				methodStub = Promise.resolve(responseListFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.renderPage.calledOnce).to.be.true;
					expect(stubs.renderPage.calledWithExactly(
						req, res, responseListFixture.productions, 'list', { pluralisedModel: 'productions' }
					)).to.be.true;
					expect(next.notCalled).to.be.true;
					done();
				});

			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {

				methodStub = Promise.reject(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});

			});

		});

	});

});
