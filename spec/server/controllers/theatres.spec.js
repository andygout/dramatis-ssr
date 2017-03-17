const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Theatre = require('../../../dist/models/theatre');

const alertFixture = require('../../fixtures/alert');
const pageDataFixture = require('../../fixtures/page-data');
const responseFixture = require('../../fixtures/response-instance');
const responseListFixture = require('../../fixtures/response-instances-list');

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
	getPageData: sinon.stub().returns(pageDataFixture),
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
	proxyquire('../../../dist/controllers/theatres', {
		'../models/theatre': stubOverrides.TheatreModel,
		'../lib/alert': stubs.alert,
		'../lib/get-page-data': stubs.getPageData,
		'../lib/handle-model-response': stubs.handleModelResponse
	});

const createInstance = (method, methodStub) => {

	req = httpMocks.createRequest();
	res = httpMocks.createResponse();

	next = sinon.stub();

	const TheatreModel = (method !== 'list') ?
		function () { this[method] = methodStub; } :
		sinon.stub(Theatre, 'list', function () { return methodStub });

	const subject = createSubject({ TheatreModel });

	const controllerFunction = `${method}Route`;

	return subject[controllerFunction](req, res, next);

};

describe('Theatre controller', () => {

	describe('edit method', () => {

		beforeEach(() => {

			method = 'edit';

		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'theatres/form\' view', done => {

				methodStub = sinon.stub().resolves(responseFixture('theatre'));
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.calledOnce).to.be.true;
					expect(stubs.getPageData.calledWithExactly(
						responseFixture('theatre').theatre, 'update')
					).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('theatres/form');
					expect(res._getRenderData()).to.deep.eq(
						{ instance: responseFixture('theatre').theatre, page: pageDataFixture, form: true }
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

				methodStub = sinon.stub().resolves(responseFixture('theatre'));
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture('theatre').theatre, 'update'
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

				methodStub = sinon.stub().resolves(responseFixture('theatre'));
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture('theatre').theatre, 'delete'
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

			it('will return status code 200 (OK) and render \'theatres/show\' view', done => {

				methodStub = sinon.stub().resolves(responseFixture('theatre'));
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.calledOnce).to.be.true;
					expect(stubs.getPageData.calledWithExactly(responseFixture('theatre').theatre, 'show')).to.be.true;
					expect(stubs.alert.getAlert.calledOnce).to.be.true;
					expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('theatres/show');
					expect(res._getRenderData()).to.deep.eq(
						{
							instance: responseFixture('theatre').theatre,
							page: pageDataFixture,
							alert: alertFixture,
							show: true
						}
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

			Theatre.list.restore();

		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'theatres/list\' view', done => {

				methodStub = Promise.resolve(responseListFixture('theatres'));
				createInstance(method, methodStub).then(() => {
					expect(stubs.alert.getAlert.calledOnce).to.be.true;
					expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('theatres/list');
					expect(res._getRenderData()).to.deep.eq(
						{
							instances: responseListFixture('theatres').theatres,
							page: { documentTitle: ' | Theatres', title: 'Theatres' },
							alert: alertFixture,
							list: true
						}
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
