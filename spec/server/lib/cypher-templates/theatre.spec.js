const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const stubs = {
	esc: sinon.stub().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
};

const resetStubs = () => {

	stubs.esc.reset();

};

beforeEach(() => {

	resetStubs();

});

const subject = proxyquire('../../../../dist/lib/cypher-templates/theatre', {
		'../escape-string': stubs.esc
	});

describe('Cypher Templates Theatre module', () => {

	describe('getValidateDeleteQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getValidateDeleteQuery('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
			expect(stubs.esc.calledOnce).to.be.true;
			expect(stubs.esc.calledWithExactly('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (t:Theatre { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })<-[r:PLAYS_AT]-(prd:Production)
				RETURN SIGN(COUNT(r)) AS relationshipCount
			`));

		});

	});

});
