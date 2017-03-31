const expect = require('chai').expect;

const subject = require('../../../dist/lib/model-naming-prop');

describe('Model Naming Prop module', () => {

	context('Model is production', () => {

		it('will return \'title\'', () => {

			expect(subject('production')).to.eq('title');

		});

	});

	context('Model is theatre (i.e. not production)', () => {

		it('will return \'name\'', () => {

			expect(subject('theatre')).to.eq('name');

		});

	});

});
