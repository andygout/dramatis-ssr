const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

let instance;
const titleString = 'Hamlet';
const nameString = 'Almeida Theatre';

const stubs = {
	format: {
		literal: sinon.stub().returns('pg-formatted value')
	}
};

const subject = proxyquire('../../../server/lib/pg-format-values', {
	'pg-format': stubs.format
});

describe('pg format values module', () => {

	it('will return an object with same keys', () => {
		instance = { title: titleString, theatre: { name: nameString } };
		const formattedInstance = subject(instance);
		expect(formattedInstance).to.be.an('object');
		const instanceKeys = Object.keys(instance).sort();
		const formattedInstanceKeys = Object.keys(formattedInstance).sort();
		expect(JSON.stringify(formattedInstanceKeys)).to.eq(JSON.stringify(formattedInstanceKeys));
	});

	it('will run format.literal() function to modify top level values', () => {
		instance = { title: titleString };
		const formattedInstance = subject(instance);
		expect(formattedInstance.title).to.eq('pg-formatted value');
	});

	it('will run format.literal() function to modify nested values', () => {
		instance = { theatre: { name: nameString } };
		const formattedInstance = subject(instance);
		expect(formattedInstance.theatre.name).to.eq('pg-formatted value');
	});

});
