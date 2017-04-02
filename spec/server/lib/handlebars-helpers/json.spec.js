const expect = require('chai').expect;

const subject = require('../../../../dist/lib/handlebars-helpers/json');

describe('JSON handlebars helper', () => {

	it('will return object in string format', () => {

		expect(subject({ property: 'value' })).to.eq('{"property":"value"}');

	});

});
