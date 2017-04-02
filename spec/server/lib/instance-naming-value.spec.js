const expect = require('chai').expect;

const subject = require('../../../dist/lib/instance-naming-value');

describe('Instance Naming Value module', () => {

	context('Instance model is included as property in listedNamingProps', () => {

		it('will return property value as dictated by listedNamingProps', () => {

			const productionInstance = { model: 'production', title: 'Hamlet' };
			expect(subject(productionInstance)).to.eq('Hamlet');

		});

	});

	context('Instance model is not included as property in listedNamingProps', () => {

		it('will default to name value', () => {

			const productionInstance = { model: 'theatre', name: 'Almeida Theatre' };
			expect(subject(productionInstance)).to.eq('Almeida Theatre');

		});

	});

});
