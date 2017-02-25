const expect = require('chai').expect;

let instance;
let newValues;

const subject = require('../../../dist/lib/renew-values');

describe('Renew Values module', () => {

	it('will use arguments to renew existing top level property values of instance', () => {
		instance = { title: 'Hamlet' };
		newValues = { title: 'Macbeth' };
		subject(instance, newValues);
		expect(instance.title).to.eq('Macbeth');
	});

	it('will not add non-existent top level properties to instance', () => {
		instance = { title: 'Hamlet' };
		newValues = { title: 'Hamlet', nonExistentProperty: 'foo' };
		subject(instance, newValues);
		expect(instance).not.to.have.property('nonExistentProperty');
	});

	it('will not remove existing top level properties from instance if not included in new values', () => {
		instance = { title: 'Hamlet' };
		newValues = {};
		subject(instance, newValues);
		expect(instance).to.have.property('title');
	});

	it('will use arguments to renew existing nested level property values of instance', () => {
		instance = { theatre: { name: 'Almeida Theatre' } };
		newValues = { theatre: { name: 'Hampstead Theatre' } };
		subject(instance, newValues);
		expect(instance.theatre.name).to.eq('Hampstead Theatre');
	});

	it('will not add non-existent nested level properties to instance', () => {
		instance = { theatre: { name: 'Almeida Theatre' } };
		newValues = { theatre: { name: 'Almeida Theatre', nonExistentProperty: 'foo' } };
		subject(instance, newValues);
		expect(instance.theatre).not.to.have.property('nonExistentProperty');
	});

	it('will not remove existing nested level properties from instance if not included in new values', () => {
		instance = { theatre: { name: 'Almeida Theatre' } };
		newValues = { theatre: {} };
		subject(instance, newValues);
		expect(instance.theatre).to.have.property('name');
	});

});
