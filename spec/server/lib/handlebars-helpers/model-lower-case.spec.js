const expect = require('chai').expect;

const subject = require('../../../../dist/lib/handlebars-helpers/model-lower-case');

describe('Model Lower Case handlebars helper', () => {

	context('model instance', () => {

		it('will return model name of instance in lower case', () => {
			const productionInstance = { model: 'Production' };
			expect(subject(productionInstance)).to.eq('production');
		});

	});

	context('array of model instances', () => {

		it('will return pluralised model name of first instance in array in lower case', () => {
			const productionInstance = { model: 'Production' };
			expect(subject([productionInstance])).to.eq('productions');
		});

	});

});
