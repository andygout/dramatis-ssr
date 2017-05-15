const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const sandbox = sinon.sandbox.create();

let stubs;
let subject;

beforeEach(() => {

	stubs = {
		capitalise: sandbox.stub().returns('Theatre'),
		instanceNamingProp: sandbox.stub().returns('name'),
		pluralise: sandbox.stub().returns('theatres')
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

describe('Cypher Templates Shared module (Theatre model usage)', () => {

	describe('getValidateUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getValidateUpdateQuery('theatre');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('theatre')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('theatre')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { name: $name }) WHERE n.uuid <> $uuid
				RETURN SIGN(COUNT(n)) AS theatreCount
			`));

		});

	});

	describe('getEditQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getEditQuery('theatre');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('theatre')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('theatre')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { uuid: $uuid })
				RETURN {
					model: 'theatre',
					uuid: n.uuid,
					name: n.name
				} AS theatre
			`));

		});

	});

	describe('getUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getUpdateQuery('theatre');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('theatre')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('theatre')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { uuid: $uuid })
				SET n.name = $name
				RETURN {
					model: 'theatre',
					uuid: n.uuid,
					name: n.name
				} AS theatre
			`));

		});

	});

	describe('getDeleteQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getDeleteQuery('theatre');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('theatre')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('theatre')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { uuid: $uuid })
				WITH n, n.name AS name
				DETACH DELETE n
				RETURN {
					model: 'theatre',
					name: name
				} AS theatre
			`));

		});

	});

	describe('getListQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getListQuery('theatre');
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly('theatre')).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly('theatre')).to.be.true;
			expect(stubs.pluralise.calledOnce).to.be.true;
			expect(stubs.pluralise.calledWithExactly('theatre')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre)
				RETURN COLLECT({
					model: 'theatre',
					uuid: n.uuid,
					name: n.name
				}) AS theatres
			`));

		});

	});

});
