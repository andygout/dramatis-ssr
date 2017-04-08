const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const getPersonInstanceFixture = require('../../../fixtures/people/get-instance');

const escStub = sinon.stub();

escStub
	.onFirstCall().returns('Patrick Stewart')
	.onSecondCall().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

const stubs = {
	capitalise: sinon.stub().returns('Person'),
	esc: escStub,
	instanceNamingProp: sinon.stub().returns('name'),
	instanceNamingValue: sinon.stub().returns('Patrick Stewart'),
	pluralise: sinon.stub().returns('people')
};

const resetStubs = () => {

	stubs.capitalise.reset();
	stubs.esc.reset();
	stubs.instanceNamingProp.reset();
	stubs.instanceNamingValue.reset();
	stubs.pluralise.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/cypher-templates/shared', {
		'../capitalise': stubs.capitalise,
		'../escape-string': stubs.esc,
		'../instance-naming-prop': stubs.instanceNamingProp,
		'../instance-naming-value': stubs.instanceNamingValue,
		'../pluralise': stubs.pluralise
	});

const removeWhitespace = string => string.replace(/\s\s+/g, ' ').trim();

describe('Cypher Templates Shared module (Person model usage)', () => {

	describe('validateUpdateQuery function', () => {

		it('will return requisite query', () => {

			const personInstance = getPersonInstanceFixture();
			const result = subject.validateUpdateQuery(personInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Patrick Stewart')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(personInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(personInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { name: 'Patrick Stewart' }) WHERE n.uuid <> 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
				RETURN SIGN(COUNT(n)) AS personCount
			`));

		});

	});

	describe('editQuery function', () => {

		it('will return requisite query', () => {

			const personInstance = getPersonInstanceFixture();
			const result = subject.editQuery(personInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Patrick Stewart')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(personInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(personInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				RETURN {
					model: 'person',
					uuid: n.uuid,
					name: n.name
				} AS person
			`));

		});

	});

	describe('updateQuery function', () => {

		it('will return requisite query', () => {

			const personInstance = getPersonInstanceFixture();
			const result = subject.updateQuery(personInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Patrick Stewart')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(personInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(personInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				SET n.name = 'Patrick Stewart'
				RETURN {
					model: 'person',
					uuid: n.uuid,
					name: n.name
				} AS person
			`));

		});

	});

	describe('deleteQuery function', () => {

		it('will return requisite query', () => {

			const personInstance = getPersonInstanceFixture();
			const result = subject.deleteQuery(personInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Patrick Stewart')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(personInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(personInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				WITH n, n.name AS name
				DETACH DELETE n
				RETURN {
					model: 'person',
					name: name
				} AS person
			`));

		});

	});

	describe('showQuery function', () => {

		it('will return requisite query', () => {

			const personInstance = getPersonInstanceFixture();
			const result = subject.showQuery(personInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(personInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(personInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Person { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				OPTIONAL MATCH (n)-[:PERFORMS_IN]->(prd:Production)-[:PLAYS_AT]->(t:Theatre)
				WITH n, t, CASE WHEN prd IS NOT NULL THEN
					COLLECT({
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
						, theatre: { model: 'theatre', uuid: t.uuid, name: t.name }
					})
				ELSE
					[]
				END AS productions
				RETURN {
					model: 'person',
					uuid: n.uuid,
					name: n.name,
					productions: productions
				} AS person
			`));

		});

	});

	describe('listQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.listQuery('person');
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
