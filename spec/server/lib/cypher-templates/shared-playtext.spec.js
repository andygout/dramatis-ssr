const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const sandbox = sinon.sandbox.create();

let stubs;
let subject;

beforeEach(() => {

	stubs = {
		capitalise: sandbox.stub().returns('Playtext'),
		instanceNamingProp: sandbox.stub().returns('name'),
		pluralise: sandbox.stub().returns('playtexts')
	};

	subject = proxyquire('../../../../dist/lib/cypher-templates/shared', {
			'../capitalise': stubs.capitalise,
			'../instance-naming-prop': stubs.instanceNamingProp,
			'../pluralise': stubs.pluralise
		});

});

afterEach(() => {

	sandbox.restore();

});

describe('Cypher Templates Shared module (Playtext model usage)', () => {

	describe('getValidateUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getValidateUpdateQuery('playtext');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('playtext')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('playtext')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Playtext { name: $name }) WHERE n.uuid <> $uuid
				RETURN SIGN(COUNT(n)) AS playtextCount
			`));

		});

	});

	describe('getEditQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getEditQuery('playtext');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('playtext')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('playtext')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Playtext { uuid: $uuid })
				RETURN {
					model: 'playtext',
					uuid: n.uuid,
					name: n.name
				} AS playtext
			`));

		});

	});

	describe('getUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getUpdateQuery('playtext');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('playtext')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('playtext')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Playtext { uuid: $uuid })
				SET n.name = $name
				RETURN {
					model: 'playtext',
					uuid: n.uuid,
					name: n.name
				} AS playtext
			`));

		});

	});

	describe('getDeleteQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getDeleteQuery('playtext');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('playtext')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('playtext')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Playtext { uuid: $uuid })
				WITH n, n.name AS name
				DETACH DELETE n
				RETURN {
					model: 'playtext',
					name: name
				} AS playtext
			`));

		});

	});

	describe('getListQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getListQuery('playtext');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('playtext')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('playtext')).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('playtext')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Playtext)
				RETURN COLLECT({
					model: 'playtext',
					uuid: n.uuid,
					name: n.name
				}) AS playtexts
			`));

		});

	});

});
