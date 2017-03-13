const expect = require('chai').expect;

const subject = require('../../../dist/lib/escape-string');

describe('Escape String module', () => {

	it('will escape one single quotation mark', () => {

		expect(subject("All's Well That Ends Well")).to.eq("All\\\'s Well That Ends Well");

	});

	it('will escape two single quotation marks', () => {

		expect(subject("All''s Well That Ends Well")).to.eq("All\\\'\\\'s Well That Ends Well");

	});

	it('will escape two backslashes', () => {

		expect(subject("All\\\\'s Well That Ends Well")).to.eq("All\\\\\\\\\\\'s Well That Ends Well");

	});

	it('will return non-string values in their original state', () => {

		expect(subject(1234567890)).to.eq(1234567890);

	});

});
