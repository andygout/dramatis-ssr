const expect = require('chai').expect;

const subject = require('../../../server/lib/trim-strings');

let instance;
const titleString = 'Hamlet';
const nameString = 'Almeida Theatre';

describe('Trim strings module', () => {

	it('will trim leading and trailing whitespace from top level string values', () => {
		instance = { title: ` ${titleString} ` };
		subject(instance);
		expect(instance.title).to.eq(titleString);
	});

	it('will trim leading and trailing whitespace from nested string values', () => {
		instance = { theatre: { name: ` ${nameString} ` } };
		subject(instance);
		expect(instance.theatre.name).to.eq(nameString);
	});

});
