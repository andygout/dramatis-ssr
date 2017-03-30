const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Theatre = require('../../../dist/models/theatre');

const getResponseFixture = require('../../fixtures/get-response-instance');
const getResponseListFixture = require('../../fixtures/get-response-instances-list');

const err = new Error('errorText');

let req;
let res;
let next;
let method;
let methodStub;

const stubs = {
	renderTemplates: {
		renderFormPage: sinon.stub(),
		renderShowPage: sinon.stub(),
		renderListPage: sinon.stub()
	},
	handleModelResponse: sinon.stub()
};

const resetStubs = () => {

	stubs.renderTemplates.renderFormPage.reset();
	stubs.renderTemplates.renderShowPage.reset();
	stubs.renderTemplates.renderListPage.reset();
	stubs.handleModelResponse.reset();

};

beforeEach(() => {

	resetStubs();

});

const createSubject = stubOverrides =>
	proxyquire('../../../dist/controllers/theatres', {
		'../models/theatre': stubOverrides.TheatreModel,
		'../lib/controller-helpers/render-templates': stubs.renderTemplates,
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

describe('Theatres controller', () => {

	describe('edit method', () => {

		beforeEach(() => {

			method = 'edit';

		});

		context('resolves with data', () => {

			it('will call renderFormPage() from renderTemplates module', done => {

				const responseFixture = getResponseFixture('theatre');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.renderTemplates.renderFormPage.calledOnce).to.be.true;
					expect(stubs.renderTemplates.renderFormPage.calledWithExactly(
						res, responseFixture.theatre, 'update'
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

				const responseFixture = getResponseFixture('theatre');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture.theatre, 'update'
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

				const responseFixture = getResponseFixture('theatre');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.handleModelResponse.calledOnce).to.be.true;
					expect(stubs.handleModelResponse.calledWithExactly(
						req, res, responseFixture.theatre, 'delete'
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

			it('will call renderShowPage() from renderTemplates module', done => {

				const responseFixture = getResponseFixture('theatre');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.renderTemplates.renderShowPage.calledOnce).to.be.true;
					expect(stubs.renderTemplates.renderShowPage.calledWithExactly(
						req, res, responseFixture.theatre
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

			Theatre.list.restore();

		});

		context('resolves with data', () => {

			it('will call renderListPage() from renderTemplates module', done => {

				const responseListFixture = getResponseListFixture('theatres');
				methodStub = Promise.resolve(responseListFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.renderTemplates.renderListPage.calledOnce).to.be.true;
					expect(stubs.renderTemplates.renderListPage.calledWithExactly(
						req, res, responseListFixture.theatres, 'theatres'
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
