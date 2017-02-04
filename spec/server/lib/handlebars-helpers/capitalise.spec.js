const expect = require('chai').expect;
const sinon = require('sinon');

const subject = require('../../../../dist/lib/handlebars-helpers/capitalise');

describe('Capitalise handlebars helper', () => {

	it('will return string with initial letter as capital', () => {
		expect(subject('string')).to.eq('String');
	});

});
