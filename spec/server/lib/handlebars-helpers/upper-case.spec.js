const expect = require('chai').expect;
const sinon = require('sinon');

const subject = require('../../../../server/lib/handlebars-helpers/upper-case');

describe('Upper Case handlebars helper', () => {

	it('will return string with initial letter as capital', () => {
		expect(subject('string')).to.eq('STRING');
	});

});
