const expect = require('chai').expect;
const sinon = require('sinon');

const Production = require('../../../dist/models/production');

let instance;
let newValues;

const subject = require('../../../dist/lib/renew-values');

describe('Renew Values module', () => {

	it('will use arguments to renew existing top level property values of instance', () => {
		instance = { title: 'Hamlet', associations: {} };
		newValues = { title: 'Macbeth' };
		subject(instance, newValues);
		expect(instance.title).to.eq('Macbeth');
	});

	it('will not add non-existent top level properties to instance', () => {
		instance = { title: 'Hamlet', associations: {} };
		newValues = { title: 'Hamlet', nonExistentProperty: 'foo' };
		subject(instance, newValues);
		expect(instance).not.to.have.property('nonExistentProperty');
	});

	it('will not remove existing top level properties from instance if not included in new values', () => {
		instance = { title: 'Hamlet', associations: {} };
		newValues = {};
		subject(instance, newValues);
		expect(instance).to.have.property('title');
	});

	it('will generate array of class instances if top level property name is included in associations', () => {
		instance = {
			productions: [],
			associations: { 'productions': sinon.stub().returns(sinon.createStubInstance(Production)) }
		};
		newValues = { productions: [{}] };
		subject(instance, newValues);
		expect(instance.productions).to.deep.eq([{}]);
		expect(instance.productions[0].constructor.name).to.eq('Production');
	});

	it('will use arguments to renew existing nested level property values of instance', () => {
		instance = { theatre: { name: 'Almeida Theatre' }, associations: {} };
		newValues = { theatre: { name: 'Hampstead Theatre' } };
		subject(instance, newValues);
		expect(instance.theatre.name).to.eq('Hampstead Theatre');
	});

	it('will not add non-existent nested level properties to instance', () => {
		instance = { theatre: { name: 'Almeida Theatre' }, associations: {} };
		newValues = { theatre: { name: 'Almeida Theatre', nonExistentProperty: 'foo' } };
		subject(instance, newValues);
		expect(instance.theatre).not.to.have.property('nonExistentProperty');
	});

	it('will not remove existing nested level properties from instance if not included in new values', () => {
		instance = { theatre: { name: 'Almeida Theatre' }, associations: {} };
		newValues = { theatre: {} };
		subject(instance, newValues);
		expect(instance.theatre).to.have.property('name');
	});

	it('will generate array of class instances if nested level property name is included in associations', () => {
		instance = {
			topLevel: { productions: [] },
			associations: { 'productions': sinon.stub().returns(sinon.createStubInstance(Production)) }
		};
		newValues = { topLevel: { productions: [{}] } };
		subject(instance, newValues);
		expect(instance.topLevel.productions).to.deep.eq([{}]);
		expect(instance.topLevel.productions[0].constructor.name).to.eq('Production');
	});

});
