const expect = require('chai').expect;
const sinon = require('sinon');

const Production = require('../../../../dist/models/production');

const stubs = {
	Production: sinon.createStubInstance(Production)
};

const subject = require('../../../../dist/lib/handlebars-helpers/instance-route');

describe('Instance Route handlebars helper', () => {

	it('will return URL (pluralised model name and ID) for instance', () => {
		stubs.Production.id = 1;
		expect(subject(stubs.Production)).to.eq('/productions/1');
	});

});
