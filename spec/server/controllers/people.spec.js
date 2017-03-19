const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Person = require('../../../dist/models/person');

const alertFixture = require('../../fixtures/alert');
const pageDataFixture = require('../../fixtures/page-data');
const getResponseFixture = require('../../fixtures/get-response-instance');
const getResponseListFixture = require('../../fixtures/get-response-instances-list');

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
	proxyquire('../../../dist/controllers/people', {
		'../models/person': stubOverrides.PersonModel,
		'../lib/alert': stubs.alert,
		'../lib/get-page-data': stubs.getPageData,
		'../lib/handle-model-response': stubs.handleModelResponse
	});

const createInstance = (method, methodStub) => {

	req = httpMocks.createRequest();
	res = httpMocks.createResponse();

	next = sinon.stub();

	const PersonModel = (method !== 'list') ?
		function () { this[method] = methodStub; } :
		sinon.stub(Person, 'list', function () { return methodStub });

	const subject = createSubject({ PersonModel });

	const controllerFunction = `${method}Route`;

	return subject[controllerFunction](req, res, next);

};

describe('Person controller', () => {

	describe('edit method', () => {

		beforeEach(() => {

			method = 'edit';

		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'people/form\' view', done => {

				const responseFixture = getResponseFixture('people');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.calledOnce).to.be.true;
					expect(stubs.getPageData.calledWithExactly(responseFixture.person, 'update')).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('people/form');
					expect(res._getRenderData()).to.deep.eq(
						{ instance: responseFixture.theatre, page: pageDataFixture, form: true }
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

			it('will return status code 200 (OK) and render \'people/show\' view', done => {

				const responseFixture = getResponseFixture('theatre');
				methodStub = sinon.stub().resolves(responseFixture);
				createInstance(method, methodStub).then(() => {
					expect(stubs.getPageData.calledOnce).to.be.true;
					expect(stubs.getPageData.calledWithExactly(responseFixture.theatre, 'show')).to.be.true;
					expect(stubs.alert.getAlert.calledOnce).to.be.true;
					expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('people/show');
					expect(res._getRenderData()).to.deep.eq(
						{
							instance: responseFixture.theatre,
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

			Person.list.restore();

		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'people/list\' view', done => {

				methodStub = Promise.resolve(getResponseListFixture('people'));
				createInstance(method, methodStub).then(() => {
					expect(stubs.alert.getAlert.calledOnce).to.be.true;
					expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
					expect(res.statusCode).to.equal(200);
					expect(res._getRenderView()).to.eq('people/list');
					expect(res._getRenderData()).to.deep.eq(
						{
							instances: getResponseListFixture('people').people,
							page: { documentTitle: ' | People', title: 'People' },
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
