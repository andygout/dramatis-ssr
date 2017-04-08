const expect = require('chai').expect;

const subject = require('../../../dist/lib/instance-naming-prop');

describe('Instance Naming Prop module', () => {

	context('Model is included as property in listedNamingProps', () => {

		it('will return property value as dictated by listedNamingProps', () => {

			expect(subject('production')).to.eq('title');

		});

	});

	context('Model is not included as property in listedNamingProps', () => {

		it('will default to name value', () => {

			expect(subject('theatre')).to.eq('name');

		});

	});

});
