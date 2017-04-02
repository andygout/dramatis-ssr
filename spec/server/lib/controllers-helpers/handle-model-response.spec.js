const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const alertFixture = require('../../../fixtures/alert');
const getInstanceFixture = require('../../../fixtures/productions/get-instance');

let req;
let res;
let action;

const stubs = {
	renderPage: sinon.stub(),
	alert: {
		setAlert: sinon.stub()
	},
	createAlertData: sinon.stub().returns(alertFixture),
	instanceRoute: sinon.stub().returns('productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
};

const resetStubs = () => {

	stubs.renderPage.reset();
	stubs.alert.setAlert.reset();
	stubs.createAlertData.reset();
	stubs.instanceRoute.reset();

};

beforeEach(() => {

	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/controllers-helpers/handle-model-response', {
		'./render-page': stubs.renderPage,
		'../alert': stubs.alert,
		'../create-alert-data': stubs.createAlertData,
		'../instance-route': stubs.instanceRoute
	});


describe('Handle Model Response module', () => {

	it('will call createAlertData module and setAlert function from alert module', () => {

		const instanceFixture = getInstanceFixture();
		subject(req, res, instanceFixture, 'create');
		expect(stubs.createAlertData.calledBefore(stubs.alert.setAlert)).to.be.true;
		expect(stubs.createAlertData.calledOnce).to.be.true;
		expect(stubs.createAlertData.calledWithExactly(instanceFixture, 'create')).to.be.true;
		expect(stubs.alert.setAlert.calledOnce).to.be.true;
		expect(stubs.alert.setAlert.calledWithExactly(req, alertFixture)).to.be.true;

	});

	describe('create action', () => {

		beforeEach(() => {

			action = 'create';

		});

		context('instance does not have model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {

				const instanceFixture = getInstanceFixture();
				subject(req, res, instanceFixture, action);
				expect(stubs.instanceRoute.calledOnce).to.be.true;
				expect(stubs.instanceRoute.calledWithExactly(instanceFixture)).to.be.true;
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

			});

		});

		context('instance has model errors', () => {

			it('will call renderPage module', () => {

				const instanceFixture = getInstanceFixture({ hasError: true });
				subject(req, res, instanceFixture, action);
				expect(stubs.renderPage.calledOnce).to.be.true;
				expect(stubs.renderPage.calledWithExactly(
					req, res, instanceFixture, 'form', { action }
				)).to.be.true;

			});

		});

	});

	describe('update action', () => {

		beforeEach(() => {

			action = 'update';

		});

		context('instance does not have model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {

				const instanceFixture = getInstanceFixture();
				subject(req, res, instanceFixture, action);
				expect(stubs.instanceRoute.calledOnce).to.be.true;
				expect(stubs.instanceRoute.calledWithExactly(instanceFixture)).to.be.true;
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

			});

		});

		context('instance has model errors', () => {

			it('will call renderPage module', () => {

				const instanceFixture = getInstanceFixture({ hasError: true });
				subject(req, res, instanceFixture, action);
				expect(stubs.renderPage.calledOnce).to.be.true;
				expect(stubs.renderPage.calledWithExactly(
					req, res, instanceFixture, 'form', { action }
				)).to.be.true;

			});

		});

	});

	describe('delete action', () => {

		beforeEach(() => {

			action = 'delete';

		});

		context('instance does not have model errors', () => {

			it('will return status code 302 (redirect to root)', () => {

				const instanceFixture = getInstanceFixture();
				subject(req, res, instanceFixture, action);
				expect(stubs.instanceRoute.notCalled).to.be.true;
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('/');

			});

		});

		context('instance has model errors', () => {

			it('will return status code 302 (redirect to instance)', () => {

				subject(req, res, getInstanceFixture({ hasError: true }), action);
				expect(res.statusCode).to.equal(302);
				expect(res._getRedirectUrl()).to.eq('productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

			});

		});

	});

});
