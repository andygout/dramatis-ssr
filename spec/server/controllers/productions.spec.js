const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Production = require('../../../dist/models/production');

const alertFixture = require('../../fixtures/alert');
const responseFixture = require('../../fixtures/productions/response-instance');
const responseListFixture = require('../../fixtures/productions/response-instances-list');
const pageDataFixture = require('../../fixtures/productions/page-data');

const err = new Error('errorText');

let req;
let res;
let next;
let method;
let methodStub;

const stubs = {
	alert: {
		getAlert: sinon.stub().returns(alertFixture)
	},
	getPageData: sinon.stub().returns(pageDataFixture()),
	handleModelResponse: sinon.stub()
};

const resetStubs = () => {

	stubs.alert.getAlert.reset();
	stubs.getPageData.reset();
	stubs.handleModelResponse.reset();

};

beforeEach(() => {

	resetStubs();

});

const createSubject = stubOverrides =>
	proxyquire('../../../dist/controllers/productions', {
		'../models/production': stubOverrides.ProductionModel,
		'../lib/alert': stubs.alert,
		'../lib/get-page-data': stubs.getPageData,
		'../lib/handle-model-response': stubs.handleModelResponse
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

describe('Production controller', () => {

	describe('new method', () => {

		beforeEach(() => {
			method = 'new';
		});

		it('will return status code 200 (OK) and render \'productions/form\' view', () => {
			methodStub = sinon.stub().returns({ model: 'Production' });
			createInstance(method, methodStub);
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly({ model: 'Production' }, 'create')).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('productions/form');
			expect(res._getRenderData()).to.deep.eq(
				{ production: { model: 'Production' }, page: pageDataFixture() }
			);
		});

	});

	describe('create method', () => {

		beforeEach(() => {
			method = 'create';
		});

		context('resolves with data', () => {

			it('will call handleModelResponse module', done => {
				methodStub = sinon.stub().resolves(responseFixture());
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture().production, 'create'
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

			it('will return status code 200 (OK) and render \'productions/form\' view', done => {
				methodStub = sinon.stub().resolves(responseFixture());
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.calledOnce).to.be.true;
					expect(stubs.getPageData.calledWithExactly(responseFixture().production, 'update')).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('productions/form');
					expect(res._getRenderData()).to.deep.eq(
						Object.assign(responseFixture(), { page: pageDataFixture() })
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.notCalled).to.be.true;
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
				methodStub = sinon.stub().resolves(responseFixture());
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture().production, 'update'
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
				methodStub = sinon.stub().resolves(responseFixture());
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture().production, 'delete'
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

			it('will return status code 200 (OK) and render \'productions/show\' view', done => {
				methodStub = sinon.stub().resolves(responseFixture());
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.calledOnce).to.be.true;
					expect(stubs.getPageData.calledWithExactly(responseFixture().production, 'show')).to.be.true;
					expect(stubs.alert.getAlert.calledOnce).to.be.true;
					expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('productions/show');
					expect(res._getRenderData()).to.deep.eq(
						Object.assign(responseFixture(), { page: pageDataFixture(), alert: alertFixture })
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.notCalled).to.be.true;
					expect(stubs.alert.getAlert.notCalled).to.be.true;
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

			it('will return status code 200 (OK) and render \'productions/list\' view', done => {
				methodStub = Promise.resolve(responseListFixture());
				createInstance(method, methodStub).then(() => {
					expect(stubs.alert.getAlert.calledOnce).to.be.true;
					expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('productions/list');
					expect(res._getRenderData()).to.deep.eq(
						Object.assign(
							responseListFixture(),
							{ page: { documentTitle: ' | Home', title: 'Productions' }, alert: alertFixture }
						)
					);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = Promise.reject(err);
				createInstance(method, methodStub).then(() => {
					expect(stubs.alert.getAlert.notCalled).to.be.true;
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

});
