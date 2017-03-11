const expect = require('chai').expect;

const subject = require('../../../../dist/lib/handlebars-helpers/instance-naming-value');

describe('Instance Naming Value handlebars helper', () => {

	context('Production model instance', () => {

		it('will return value of title property', () => {
			const productionInstance = { model: 'Production', title: 'Hamlet' };
			expect(subject(productionInstance)).to.eq('Hamlet');
		});

	});

	context('Theatre model instance', () => {

		it('will return value of name property', () => {
			const theatreInstance = { model: 'Theatre', name: 'Almeida Theatre' };
			expect(subject(theatreInstance)).to.eq('Almeida Theatre');
		});

	});

});
