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

const subject = proxyquire('../../../../dist/lib/controller-helpers/render-templates', {
		'../alert': stubs.alert,
		'../get-list-page-data': stubs.getListPageData,
		'../get-page-data': stubs.getPageData,
		'../pluralise': stubs.pluralise
	});


describe('Render Templates module', () => {

	describe('renderFormPage function', () => {

		it('will render form page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject.renderFormPage(req, res, instanceFixture, 'update');
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instanceFixture, 'update')).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('productions/form');
			expect(res._getRenderData()).to.deep.eq(
				{ instance: instanceFixture, page: pageDataFixture, alert: alertFixture, form: true }
			);

		});

	});

	describe('renderShowPage function', () => {

		it('will render show page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject.renderShowPage(req, res, instanceFixture);
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(stubs.getPageData.calledOnce).to.be.true;
			expect(stubs.getPageData.calledWithExactly(instanceFixture, 'show')).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('productions/show');
			expect(res._getRenderData()).to.deep.eq(
				{ instance: instanceFixture, page: pageDataFixture, alert: alertFixture, show: true }
			);

		});

	});

	describe('renderListPage function', () => {

		it('will render list page with requisite data', () => {

			const instanceFixture = getInstanceFixture();
			subject.renderListPage(req, res, [instanceFixture], 'productions');
			expect(stubs.getListPageData.calledOnce).to.be.true;
			expect(stubs.getListPageData.calledWithExactly('productions')).to.be.true;
			expect(stubs.alert.getAlert.calledOnce).to.be.true;
			expect(stubs.alert.getAlert.calledWithExactly(req)).to.be.true;
			expect(res.statusCode).to.eq(200);
			expect(res._getRenderView()).to.eq('productions/list');
			expect(res._getRenderData()).to.deep.eq(
				{ instances: [instanceFixture], page: listPageDataFixture, alert: alertFixture, list: true }
			);

		});

	});

});
