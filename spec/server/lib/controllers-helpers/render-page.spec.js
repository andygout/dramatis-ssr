const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const alertFixture = require('../../../fixtures/alert');
const listPageDataFixture = require('../../../fixtures/list-page-data');
const pageDataFixture = require('../../../fixtures/page-data');
const getInstanceFixture = require('../../../fixtures/productions/get-instance');

let req;
let res;

const stubs = {
	alert: {
		getAlert: sinon.stub().returns(alertFixture)
	},
	getListPageData: sinon.stub().returns(listPageDataFixture),
	getPageData: sinon.stub().returns(pageDataFixture),
	pluralise: sinon.stub().returns('productions')
};

const resetStubs = () => {

	stubs.alert.getAlert.reset();
	stubs.getListPageData.reset();
	stubs.getPageData.reset();
	stubs.pluralise.reset();

};

beforeEach(() => {

	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/controllers-helpers/render-page', {
		'../alert': stubs.alert,
		'../get-list-page-data': stubs.getListPageData,
		'../get-page-data': stubs.getPageData,
		'../pluralise': stubs.pluralise
	});


describe('Render Page module', () => {

	context('\'form\' as page argument', () => {

		it('will render form page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject(req, res, instanceFixture, 'form', { action: 'update' });
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instanceFixture, 'update')).to.be.true;
			expect(stubs.getListPageData.notCalled).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('productions/form');
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
			expect(stubs.getPageData.calledWithExactly(instanceFixture, 'show')).to.be.true;
			expect(stubs.getListPageData.notCalled).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('productions/show');
			expect(res._getRenderData()).to.deep.eq(
				{ page: pageDataFixture, alert: alertFixture, show: true, instance: instanceFixture }
			);

		});

	});

	context('\'list\' as page argument', () => {

		it('will render list page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject(req, res, [instanceFixture], 'list', { pluralisedModel: 'productions' });
			expect(stubs.getListPageData.calledOnce).to.be.true;
			expect(stubs.getListPageData.calledWithExactly('productions')).to.be.true;
			expect(stubs.getPageData.notCalled).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(stubs.pluralise.notCalled).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('productions/list');
			expect(res._getRenderData()).to.deep.eq(
				{ page: listPageDataFixture, alert: alertFixture, list: true, instances: [instanceFixture] }
			);

		});

	});

});
