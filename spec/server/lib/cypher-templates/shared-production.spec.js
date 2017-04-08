const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const getProductionInstanceFixture = require('../../../fixtures/productions/get-instance');

const escStub = sinon.stub();
escStub
	.onFirstCall().returns('Hamlet')
	.onSecondCall().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

const stubs = {
	capitalise: sinon.stub().returns('Production'),
	esc: escStub,
	instanceNamingProp: sinon.stub().returns('title'),
	instanceNamingValue: sinon.stub().returns('Hamlet'),
	pluralise: sinon.stub().returns('productions')
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

describe('Cypher Templates Shared module (Production model usage)', () => {

	describe('getDeleteQuery function', () => {

		it('will return requisite query', () => {

			const productionInstance = getProductionInstanceFixture();
			const result = subject.getDeleteQuery(productionInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(productionInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Hamlet')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(productionInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(productionInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(productionInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Production { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				WITH n, n.title AS title
				DETACH DELETE n
				RETURN {
					model: 'production',
					title: title
				} AS production
			`));

		});

	});

	describe('getListQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getListQuery('production');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('production')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('production')).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('production')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Production)-[:PLAYS_AT]->(t:Theatre)
				RETURN COLLECT({
					model: 'production',
					uuid: n.uuid,
					title: n.title
					, theatre: { model: 'theatre', uuid: t.uuid, name: t.name }
				}) AS productions
			`));

		});

	});

});
