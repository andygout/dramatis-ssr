const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const getTheatreInstanceFixture = require('../../../fixtures/theatres/get-instance');

const escStub = sinon.stub();

escStub
	.onFirstCall().returns('Almeida Theatre')
	.onSecondCall().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

const stubs = {
	capitalise: sinon.stub().returns('Theatre'),
	esc: escStub,
	instanceNamingProp: sinon.stub().returns('name'),
	instanceNamingValue: sinon.stub().returns('Almeida Theatre'),
	pluralise: sinon.stub().returns('theatres')
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

describe('Cypher Templates Shared module (Theatre model usage)', () => {

	describe('getValidateUpdateQuery function', () => {

		it('will return requisite query', () => {

			const theatreInstance = getTheatreInstanceFixture();
			const result = subject.getValidateUpdateQuery(theatreInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Almeida Theatre')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(theatreInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(theatreInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { name: 'Almeida Theatre' }) WHERE n.uuid <> 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
				RETURN SIGN(COUNT(n)) AS theatreCount
			`));

		});

	});

	describe('getEditQuery function', () => {

		it('will return requisite query', () => {

			const theatreInstance = getTheatreInstanceFixture();
			const result = subject.getEditQuery(theatreInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Almeida Theatre')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(theatreInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(theatreInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
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

			const theatreInstance = getTheatreInstanceFixture();
			const result = subject.getUpdateQuery(theatreInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Almeida Theatre')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(theatreInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(theatreInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				SET n.name = 'Almeida Theatre'
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

			const theatreInstance = getTheatreInstanceFixture();
			const result = subject.getDeleteQuery(theatreInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.esc.calledTwice).to.be.true;
			expect(stubs.esc.firstCall.calledWithExactly('Almeida Theatre')).to.be.true;
			expect(stubs.esc.secondCall.calledWithExactly(theatreInstance.uuid)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(theatreInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				WITH n, n.name AS name
				DETACH DELETE n
				RETURN {
					model: 'theatre',
					name: name
				} AS theatre
			`));

		});

	});

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const theatreInstance = getTheatreInstanceFixture();
			const result = subject.getShowQuery(theatreInstance);
			expect(stubs.capitalise.calledOnce).to.be.true;
			expect(stubs.capitalise.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.instanceNamingProp.calledOnce).to.be.true;
			expect(stubs.instanceNamingProp.calledWithExactly(theatreInstance.model)).to.be.true;
			expect(stubs.instanceNamingValue.calledOnce).to.be.true;
			expect(stubs.instanceNamingValue.calledWithExactly(theatreInstance)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (n:Theatre { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				OPTIONAL MATCH (n)<-[:PLAYS_AT]-(prd:Production)
				WITH n, CASE WHEN prd IS NOT NULL THEN
					COLLECT({
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
					})
				ELSE
					[]
				END AS productions
				RETURN {
					model: 'theatre',
					uuid: n.uuid,
					name: n.name,
					productions: productions
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
