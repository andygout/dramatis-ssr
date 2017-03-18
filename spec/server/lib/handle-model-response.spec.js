const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const alertFixture = require('../../fixtures/alert');
const pageDataFixture = require('../../fixtures/page-data');
const getInstanceFixture = require('../../fixtures/productions/get-instance');

let req;
let res;
let action;

const stubs = {
	alert: {
		setAlert: sinon.stub(),
		getAlert: sinon.stub().returns(alertFixture)
	},
	createAlertData: sinon.stub(),
	getPageData: sinon.stub().returns(pageDataFixture),
	instanceRoute: sinon.stub().returns('instance route')
};

const resetStubs = () => {

	stubs.alert.setAlert.reset();
	stubs.alert.getAlert.reset();
	stubs.createAlertData.reset();
	stubs.getPageData.reset();
	stubs.instanceRoute.reset();

};

beforeEach(() => {

	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	resetStubs();

});

const subject = proxyquire('../../../dist/lib/handle-model-response', {
		'./alert': stubs.alert,
		'./create-alert-data': stubs.createAlertData,
		'./get-page-data': stubs.getPageData,
		'./instance-route': stubs.instanceRoute
	});


describe('Handle Model Response module', () => {

	it('will call createAlertData module and setAlert function from alert module', () => {

		subject(req, res, getInstanceFixture(), 'create');
		expect(stubs.createAlertData.calledOnce).to.be.true;
		expect(stubs.alert.setAlert.calledOnce).to.be.true;

	});

	describe('create action', () => {

		beforeEach(() => {

			action = 'create';

		});

		context('instance does not have model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {

				subject(req, res, getInstanceFixture(), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('instance route');

			});

		});

		context('instance has model errors', () => {

			it('will return status code 200 (OK) and render form view', () => {

				const instanceFixture = getInstanceFixture({ hasError: true });
				subject(req, res, instanceFixture, action);
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.alert.getAlert.calledOnce).to.be.true;
				expect(res.statusCode).to.equal(200);
				expect(res._getRenderView()).to.eq('productions/form');
				expect(res._getRenderData()).to.deep.eq(
					{
						instance: instanceFixture,
						page: pageDataFixture,
						alert: alertFixture,
						form: true
					}
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

				subject(req, res, getInstanceFixture(), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('instance route');

			});

		});

		context('instance has model errors', () => {

			it('will return status code 200 (OK) and render form view', () => {

				const instanceFixture = getInstanceFixture({ hasError: true });
				subject(req, res, instanceFixture, action);
				expect(stubs.getPageData.calledOnce).to.be.true;
				expect(stubs.alert.getAlert.calledOnce).to.be.true;
				expect(res.statusCode).to.equal(200);
				expect(res._getRenderView()).to.eq('productions/form');
				expect(res._getRenderData()).to.deep.eq(
					{
						instance: instanceFixture,
						page: pageDataFixture,
						alert: alertFixture,
						form: true
					}
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

				subject(req, res, getInstanceFixture(), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('/');

			});

		});

		context('instance has model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {

				subject(req, res, getInstanceFixture({ hasError: true }), action);
				expect(stubs.getPageData.notCalled).to.be.true;
				expect(stubs.alert.getAlert.notCalled).to.be.true;
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('instance route');

			});

		});

	});

});
