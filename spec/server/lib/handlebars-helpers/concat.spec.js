const expect = require('chai').expect;

const subject = require('../../../../dist/lib/handlebars-helpers/concat');

describe('Concat handlebars helper', () => {

	it('will return arguments in string format and concatenated', () => {

		expect(subject('a', 'b', 'c', 1, 2, 3)).to.eq('abc123');

	});

	it('will ignore objects included as arguments', () => {

		expect(subject('a', 'b', { foo: 'bar '}, 'c', 1, 2, 3)).to.eq('abc123');

	});

});
