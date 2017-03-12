const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const alertFixture = require('../../fixtures/alert');
const instanceFixture = require('../../fixtures/productions/instance');
const pageDataFixture = require('../../fixtures/productions/page-data');

let request;
let response;
let action;

const stubs = {
	alert: {
		getAlert: sinon.stub().returns(alertFixture)
	},
	createAlert: sinon.stub(),
	getPageData: sinon.stub().returns(pageDataFixture()),
	instanceRoute: sinon.stub().returns('instance route')
};

const resetStubs = () => {

	stubs.alert.getAlert.reset();
	stubs.createAlert.reset();
	stubs.getPageData.reset();
	stubs.instanceRoute.reset();

};

beforeEach(() => {

	request = httpMocks.createRequest({ flash: stubs.alert });
	response = httpMocks.createResponse();
	resetStubs();

});

const subject = proxyquire('../../../dist/lib/handle-model-response', {
		'./alert': stubs.alert,
		'./create-alert': stubs.createAlert,
		'./get-page-data': stubs.getPageData,
		'./instance-route': stubs.instanceRoute
	});


describe('Handle Model Response module', () => {

	it('will call createAlert module', () => {
		subject(request, response, instanceFixture(), 'create');
		expect(stubs.createAlert.calledOnce).to.be.true;
	});

	describe('create action', () => {

		beforeEach(() => {
			action = 'create';
		});

		context('instance does not have model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {
				subject(request, response, instanceFixture(), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(response.statusCode).to.equal(302);
				expect(response._getRedirectUrl()).to.eq('instance route');
			});

		});

		context('instance has model errors', () => {

			it('will return status code 200 (OK) and render form view', () => {
				subject(request, response, instanceFixture({ hasError: true }), action);
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.alert.getAlert.calledOnce).to.be.true;
				expect(response.statusCode).to.equal(200);
				expect(response._getRenderView()).to.eq('productions/form');
				expect(response._getRenderData()).to.deep.eq(
					{ production: instanceFixture({ hasError: true }), page: pageDataFixture(), alert: alertFixture }
				);
			});

		});

	});

	describe('update action', () => {

		beforeEach(() => {
			action = 'update';
		});

		context('instance does not have model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {
				subject(request, response, instanceFixture(), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(response.statusCode).to.equal(302);
				expect(response._getRedirectUrl()).to.eq('instance route');
			});

		});

		context('instance has model errors', () => {

			it('will return status code 200 (OK) and render form view', () => {
				subject(request, response, instanceFixture({ hasError: true }), action);
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.alert.getAlert.calledOnce).to.be.true;
				expect(response.statusCode).to.equal(200);
				expect(response._getRenderView()).to.eq('productions/form');
				expect(response._getRenderData()).to.deep.eq(
					{ production: instanceFixture({ hasError: true }), page: pageDataFixture(), alert: alertFixture }
				);
			});

		});

	});

	describe('delete action', () => {

		beforeEach(() => {
			action = 'delete';
		});

		context('instance does not have model errors', () => {

			it('will return status code 302 (redirect to root)', () => {
				subject(request, response, instanceFixture(), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(response.statusCode).to.equal(302);
				expect(response._getRedirectUrl()).to.eq('/');
			});

		});

		context('instance has model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {
				subject(request, response, instanceFixture({ hasError: true }), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(response.statusCode).to.equal(302);
				expect(response._getRedirectUrl()).to.eq('instance route');
			});

		});

	});

});
