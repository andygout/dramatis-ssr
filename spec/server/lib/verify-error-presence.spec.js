const expect = require('chai').expect;

const subject = require('../../../server/lib/verify-error-presence');

let instance;

describe('Verify error presence module', () => {

	it('will return false if no errors present', () => {
		instance = { errors: {}, theatre: { errors: {} } };
		expect(subject(instance)).to.eq(false);
	});

	it('will return true if top level errors present', () => {
		instance = { errors: { title: ['Title is too short'] }, theatre: { errors: {} } };
		expect(subject(instance)).to.eq(true);
	});

	it('will return true if nested errors present', () => {
		instance = { errors: {}, theatre: { errors: { name: ['Name is too short'] } } };
		expect(subject(instance)).to.eq(true);
	});

});
