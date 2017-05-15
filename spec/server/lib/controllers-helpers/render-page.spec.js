const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const alertFixture = require('../../../fixtures/alert');
const pageDataFixture = require('../../../fixtures/page-data');
const getInstanceFixture = require('../../../fixtures/productions/get-instance');

const sandbox = sinon.sandbox.create();

let stubs;
let subject;
let req;
let res;

beforeEach(() => {

	req = httpMocks.createRequest();
	res = httpMocks.createResponse();

	stubs = {
		alert: {
			getAlert: sandbox.stub().returns(alertFixture)
		},
		getPageData: sandbox.stub().returns(pageDataFixture),
		pluralise: sandbox.stub().returns('productions')
	};

	subject = proxyquire('../../../../dist/lib/controllers-helpers/render-page', {
			'../alert': stubs.alert,
			'../get-page-data': stubs.getPageData,
			'../pluralise': stubs.pluralise
		});

});

afterEach(() => {

	sandbox.restore();

});

describe('Render Page module', () => {

	context('\'form\' as page argument', () => {

		it('will render form page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject(req, res, instanceFixture, 'form', { action: 'update' });
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instanceFixture, 'update', {})).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('models/productions/form');
			expect(res._getRenderData()).to.deep.eq(
				{ page: pageDataFixture, alert: alertFixture, form: true, instance: instanceFixture }
			);

		});

	});

	context('\'show\' as page argument', () => {

		it('will render show page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject(req, res, instanceFixture, 'show');
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instanceFixture, 'show', {})).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('models/productions/show');
			expect(res._getRenderData()).to.deep.eq(
				{ page: pageDataFixture, alert: alertFixture, show: true, instance: instanceFixture }
			);

		});

	});

	context('\'list\' as page argument', () => {

		it('will render list page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject(req, res, [instanceFixture], 'list', { pluralisedModel: 'productions' });
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(
				[instanceFixture], 'list', { pluralisedModel: 'productions' }
			)).to.be.true;
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(stubs.pluralise.notCalled).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('models/productions/list');
			expect(res._getRenderData()).to.deep.eq(
				{ page: pageDataFixture, alert: alertFixture, list: true, instances: [instanceFixture] }
			);

		});

	});

});
