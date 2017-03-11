const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Theatre = require('../../../dist/models/theatre');

const alertFixture = require('../../fixtures/alert');
const instanceFixture = require('../../fixtures/theatres/instance');
const instancesListFixture = require('../../fixtures/theatres/instances-list');
const pageDataFixture = require('../../fixtures/theatres/page-data');

const err = new Error('errorText');

const stubs = {
	alert: sinon.stub().returns('alertStub')
};

const resetStubs = () => {

	stubs.alert.reset();

};

beforeEach(() => {

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
	proxyquire(`../../../dist/controllers/theatres`, {
		'../models/theatre': stubs.TheatreModel,
		'../lib/get-page-data': stubs.getPageData
	});

const createInstance = (action, method, methodStub) => {

	request = httpMocks.createRequest({ flash: stubs.alert });

	response = httpMocks.createResponse();

	next = sinon.stub();

	const TheatreModel = (method !== 'list') ?
		function () { this[method] = methodStub; } :
		sinon.stub(Theatre, 'list', function () { return methodStub });

	getPageDataStub = sinon.stub().returns(pageDataFixture(action));

	const subject = createSubject({ TheatreModel, getPageData: getPageDataStub });

	const controllerFunction = `${method}Route`;

	return subject[controllerFunction](request, response, next);

};

describe('Theatre controller', () => {

	describe('edit method', () => {

		beforeEach(() => {
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

			it('will return status code 200 (OK) and render \'theatres/form\' view', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('theatres/form');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign(instanceFixture(), { page: pageDataFixture(action) })
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

		beforeEach(() => {
			action = method = 'update';
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect to instance)', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRedirectUrl()).to.eq('/theatres/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will not call getPageData function', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(action, method, methodStub).then(() => {
					expect(getPageDataStub.notCalled).to.be.true;
					done();
				});
			});

			xit('will return status code 200 (OK) and render \'theatres/form\' view', done => {
				methodStub = sinon.stub().resolves(instanceFixture({ hasError: true }));
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('theatres/form');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign(
							instanceFixture({ hasError: true }),
							{ page: pageDataFixture(action), alert: alertFixture }
						)
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

		beforeEach(() => {
			action = method = 'delete';
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
					expect(response._getRedirectUrl()).to.eq('/theatres/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
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

		beforeEach(() => {
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

			it('will return status code 200 (OK) and render \'theatres/show\' view', done => {
				methodStub = sinon.stub().resolves(instanceFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('theatres/show');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign(instanceFixture(), { page: pageDataFixture(action), alert: alertFixture })
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

		beforeEach(() => {
			method = 'list';
		});

		afterEach(() => {
			Theatre.list.restore();
		});

		context('resolves with data', () => {

			it('will return status code 200 (OK) and render \'theatres/list\' view', done => {
				methodStub = Promise.resolve(instancesListFixture());
				createInstance(action, method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderView()).to.eq('theatres/list');
					expect(response._getRenderData()).to.deep.eq(
						Object.assign(
							instancesListFixture(),
							{ page: { documentTitle: ' | Theatres', title: 'Theatres' }, alert: alertFixture }
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
				createInstance(action, method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

});
