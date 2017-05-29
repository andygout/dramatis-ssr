const expect = require('chai').expect;

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const subject = require('../../../../dist/lib/cypher-templates/playtext');

describe('Cypher Templates Playtext module', () => {

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (playtext:Playtext { uuid: $uuid })
				OPTIONAL MATCH (playtext)<-[:PRODUCTION_OF]-(production:Production)-[:PLAYS_AT]->(theatre:Theatre)
				WITH playtext, production, theatre
				WITH playtext, CASE WHEN production IS NULL THEN [] ELSE
					COLLECT({
						model: 'production',
						uuid: production.uuid,
						title: production.title,
						theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name }
					}) END AS productions
				RETURN {
					model: 'playtext',
					uuid: playtext.uuid,
					title: playtext.title,
					productions: productions
				} AS playtext
			`));

		});

	});

});
