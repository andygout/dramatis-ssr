const expect = require('chai').expect;

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const subject = require('../../../../dist/lib/cypher-templates/character');

describe('Cypher Templates Character module', () => {

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (character:Character { uuid: $uuid })
				OPTIONAL MATCH (character)<-[:INCLUDES_CHARACTER]-(playtext:Playtext)
				RETURN {
					model: 'character',
					uuid: character.uuid,
					name: character.name,
					playtexts: CASE WHEN playtext IS NULL THEN [] ELSE
						COLLECT({
							model: 'playtext',
							uuid: playtext.uuid,
							name: playtext.name
						}) END
				} AS character
			`));

		});

	});

});
