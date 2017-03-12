const expect = require('chai').expect;

const subject = require('../../../../dist/lib/handlebars-helpers/model');

describe('Model handlebars helper', () => {

	context('model instance', () => {

		it('will return model name of instance', () => {

			const productionInstance = { model: 'production' };
			expect(subject(productionInstance)).to.eq('production');

		});

	});

	context('array of model instances', () => {

		it('will return pluralised model name of first instance in array', () => {

			const productionInstance = { model: 'production' };
			expect(subject([productionInstance])).to.eq('productions');

		});

	});

});
