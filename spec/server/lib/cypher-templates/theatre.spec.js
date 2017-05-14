const expect = require('chai').expect;

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const subject = require('../../../../dist/lib/cypher-templates/theatre');

describe('Cypher Templates Theatre module', () => {

	describe('getValidateDeleteQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getValidateDeleteQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (t:Theatre { uuid: $uuid })<-[r:PLAYS_AT]-(prd:Production)
				RETURN SIGN(COUNT(r)) AS relationshipCount
			`));

		});

	});

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (t:Theatre} { uuid: $uuid })
				OPTIONAL MATCH (n)<-[:PLAYS_AT]-(prd:Production)
				WITH t, CASE WHEN prd IS NULL THEN [] ELSE
					COLLECT({ model: 'production', uuid: prd.uuid, title: prd.title }) END AS productions
				RETURN {
					model: 'theatre',
					uuid: t.uuid,
					name: t.name,
					productions: productions
				} AS theatre
			`));

		});

	});

});
