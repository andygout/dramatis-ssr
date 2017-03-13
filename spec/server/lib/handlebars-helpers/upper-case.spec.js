const expect = require('chai').expect;

const subject = require('../../../../dist/lib/handlebars-helpers/upper-case');

describe('Upper Case handlebars helper', () => {

	it('will return string in upper case', () => {

		expect(subject('string')).to.eq('STRING');

	});

});
