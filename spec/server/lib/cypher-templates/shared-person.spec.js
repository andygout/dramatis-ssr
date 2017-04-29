const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const stubs = {
	capitalise: sinon.stub().returns('Person'),
	instanceNamingProp: sinon.stub().returns('name'),
	pluralise: sinon.stub().returns('people')
};

const resetStubs = () => {

	stubs.capitalise.reset();
	stubs.instanceNamingProp.reset();
	stubs.pluralise.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/cypher-templates/shared', {
		'../capitalise': stubs.capitalise,
		'../instance-naming-prop': stubs.instanceNamingProp,
		'../pluralise': stubs.pluralise
	});

describe('Cypher Templates Shared module (Person model usage)', () => {

	describe('getValidateUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getValidateUpdateQuery('person');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('person')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('person')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { name: $name }) WHERE n.uuid <> $uuid
				RETURN SIGN(COUNT(n)) AS personCount
			`));

		});

	});

	describe('getEditQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getEditQuery('person');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('person')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('person')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { uuid: $uuid })
				RETURN {
					model: 'person',
					uuid: n.uuid,
					name: n.name
				} AS person
			`));

		});

	});

	describe('getUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getUpdateQuery('person');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('person')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('person')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { uuid: $uuid })
				SET n.name = $name
				RETURN {
					model: 'person',
					uuid: n.uuid,
					name: n.name
				} AS person
			`));

		});

	});

	describe('getDeleteQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getDeleteQuery('person');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('person')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('person')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { uuid: $uuid })
				WITH n, n.name AS name
				DETACH DELETE n
				RETURN {
					model: 'person',
					name: name
				} AS person
			`));

		});

	});

	describe('getListQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getListQuery('person');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('person')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('person')).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('person')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person)
				RETURN COLLECT({
					model: 'person',
					uuid: n.uuid,
					name: n.name
				}) AS people
			`));

		});

	});

});
