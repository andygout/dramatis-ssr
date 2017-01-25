const expect = require('chai').expect;
const sinon = require('sinon');

const Production = require('../../../../server/models/production');

const stubs = {
	Production: sinon.createStubInstance(Production)
};

const subject = require('../../../../server/lib/handlebars-helpers/model-route');

describe('Model Route handlebars helper', () => {

	it('will return pluralised model name of instance in lower case (to match controller route)', () => {
		expect(subject(stubs.Production)).to.eq('productions');
	});

});
