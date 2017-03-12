const expect = require('chai').expect;

const subject = require('../../../dist/lib/instance-naming-value');

describe('Instance Naming Value module', () => {

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
