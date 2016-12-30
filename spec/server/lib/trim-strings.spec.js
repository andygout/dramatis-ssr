const expect = require('chai').expect;

const subject = require('../../../server/lib/trim-strings');

let instance;
const titleString = 'Hamlet';
const nameString = 'Almeida Theatre';

describe('Trim strings module', () => {

	it('will return an object with same keys', () => {
		instance = { title: ` ${titleString} `, theatre: { name: ` ${nameString} ` } };
		const trimmedInstance = subject(instance);
		expect(trimmedInstance).to.be.an('object');
		const instanceKeys = Object.keys(instance).sort();
		const trimmedInstanceKeys = Object.keys(trimmedInstance).sort();
		expect(JSON.stringify(trimmedInstanceKeys)).to.eq(JSON.stringify(trimmedInstanceKeys));
	});

	it('will trim leading and trailing whitespace from top level string values', () => {
		instance = { title: ` ${titleString} ` };
		const trimmedInstance = subject(instance);
		expect(trimmedInstance.title).to.eq(titleString);
	});

	it('will trim leading and trailing whitespace from nested string values', () => {
		instance = { theatre: { name: ` ${nameString} ` } };
		const trimmedInstance = subject(instance);
		expect(trimmedInstance.theatre.name).to.eq(nameString);
	});

});
