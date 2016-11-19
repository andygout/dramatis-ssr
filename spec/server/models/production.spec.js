require('../../../setup');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const stubs = {
	pageData: {
		getPageData: sinon.stub()
	}
};

const subject = proxyquire('../../../server/models/production', {
	'../lib/page-data.js': stubs.pageData
}).default;

describe('Production', () => {

	it('new method: will call pageData', () => {
		const instance = new subject();
		instance.new();
		expect(stubs.pageData.getPageData.calledOnce).to.be.true;
		expect(stubs.pageData.getPageData.calledWithExactly(instance, 'create')).to.be.true;
	});

});
