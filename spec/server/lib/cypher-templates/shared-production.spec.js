const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const stubs = {
	capitalise: sinon.stub().returns('Production'),
	instanceNamingProp: sinon.stub().returns('title'),
	pluralise: sinon.stub().returns('productions')
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

describe('Cypher Templates Shared module (Production model usage)', () => {

	describe('getDeleteQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getDeleteQuery('production');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('production')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('production')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Production { uuid: $uuid })
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
