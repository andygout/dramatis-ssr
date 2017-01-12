const expect = require('chai').expect;

const subject = require('../../../server/lib/renew-top-level-values');

let instance;
let newValues;

describe('Renew Top Level Values module', () => {

	it('will use arguments to renew top level property values of instance', () => {
		instance = { title: 'Hamlet' };
		newValues = { title: 'Macbeth' };
		subject(instance, newValues);
		expect(instance.title).to.eq('Macbeth');
	});

	it('will not add non-existent properties to instance', () => {
		instance = { title: 'Hamlet' };
		newValues = { nonExistentProperty: 'foo' };
		subject(instance, newValues);
		expect(instance).not.to.have.property('nonExistentProperty');
	});

});
