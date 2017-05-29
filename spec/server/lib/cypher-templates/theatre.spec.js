const expect = require('chai').expect;

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const subject = require('../../../../dist/lib/cypher-templates/theatre');

describe('Cypher Templates Theatre module', () => {

	describe('getValidateDeleteQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getValidateDeleteQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (theatre:Theatre { uuid: $uuid })<-[relationship:PLAYS_AT]-(production:Production)
				RETURN SIGN(COUNT(relationship)) AS relationshipCount
			`));

		});

	});

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (theatre:Theatre { uuid: $uuid })
				OPTIONAL MATCH (theatre)<-[:PLAYS_AT]-(production:Production)
				WITH theatre, CASE WHEN production IS NULL THEN [] ELSE
					COLLECT({ model: 'production', uuid: production.uuid, title: production.title }) END AS productions
				RETURN {
					model: 'theatre',
					uuid: theatre.uuid,
					name: theatre.name,
					productions: productions
				} AS theatre
			`));

		});

	});

});
