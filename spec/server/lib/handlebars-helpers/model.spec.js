const expect = require('chai').expect;
const sinon = require('sinon');

const subject = require('../../../../server/lib/handlebars-helpers/model');

const Production = require('../../../../server/models/production');

const stubs = {
	Production: sinon.createStubInstance(Production)
};

describe('Model handlebars helper', () => {

	context('model instance', () => {

		it('will return model name of instance', () => {
			expect(subject(stubs.Production)).to.eq('Production');
		});

	});

	context('array of model instances', () => {

		it('will return pluralised model name of first instance in array', () => {
			expect(subject([stubs.Production])).to.eq('Productions');
		});

	});

});
