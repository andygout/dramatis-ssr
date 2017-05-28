const expect = require('chai').expect;

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const subject = require('../../../../dist/lib/cypher-templates/playtext');

describe('Cypher Templates Playtext module', () => {

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (pt:Playtext { uuid: $uuid })
				OPTIONAL MATCH (pt)<-[:PRODUCTION_OF]-(prd:Production)-[:PLAYS_AT]->(t:Theatre)
				WITH pt, prd, t
				WITH pt, CASE WHEN prd IS NULL THEN [] ELSE
					COLLECT({
						model: 'production',
						uuid: prd.uuid,
						title: prd.title,
						theatre: { model: 'theatre', uuid: t.uuid, name: t.name }
					}) END AS productions
				RETURN {
					model: 'playtext',
					uuid: pt.uuid,
					title: pt.title,
					productions: productions
				} AS playtext
			`));

		});

	});

});
