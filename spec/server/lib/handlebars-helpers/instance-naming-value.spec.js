const expect = require('chai').expect;
const sinon = require('sinon');

const Production = require('../../../../dist/models/production');
const Theatre = require('../../../../dist/models/theatre');

const stubs = {
	Production: null,
	Theatre: null
};

const resetStubs = () => {

	stubs.Production = sinon.createStubInstance(Production);
	stubs.Theatre = sinon.createStubInstance(Theatre);

};

beforeEach(function () {

	resetStubs();

});

const subject = require('../../../../dist/lib/handlebars-helpers/instance-naming-value');

describe('Instance Naming Value handlebars helper', () => {

	context('Production model instance', () => {

		it('will return value of title property', () => {
			stubs.Production.title = 'Hamlet'
			expect(subject(stubs.Production)).to.eq('Hamlet');
		});

	});

	context('Theatre model instance', () => {

		it('will return value of name property', () => {
			stubs.Theatre.name = 'Almeida Theatre'
			expect(subject(stubs.Theatre)).to.eq('Almeida Theatre');
		});

	});

});
