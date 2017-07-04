const expect = require('chai').expect;

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const subject = require('../../../../dist/lib/cypher-templates/character');

describe('Cypher Templates Character module', () => {

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (character:Character { uuid: $uuid })
				OPTIONAL MATCH (character)<-[playtextRel:INCLUDES_CHARACTER]-(playtext:Playtext)
				OPTIONAL MATCH (character)<-[playtextRel]-(playtext)<-[prodRel:PRODUCTION_OF]-(production:Production)<-
					[castRel:PERFORMS_IN]-(person:Person)-[:PERFORMS_AS { prodUuid: production.uuid }]->(role:Role)
					WHERE character.name = role.name
				OPTIONAL MATCH (person)-[otherRoleRel:PERFORMS_AS { prodUuid: production.uuid }]->(otherRole:Role)
					WHERE otherRole.name <> character.name
				OPTIONAL MATCH (otherRole)<-[otherRoleRel]-(person)-[castRel]->(production)-[prodRel]->(playtext)-[:INCLUDES_CHARACTER]->(otherCharacter:Character) WHERE otherRole.name = otherCharacter.name
				OPTIONAL MATCH (production)-[:PLAYS_AT]->(theatre:Theatre)
				WITH character, production, theatre, castRel, person, role, otherRole, otherRoleRel, otherCharacter, CASE WHEN playtext IS NULL THEN [] ELSE
					COLLECT({
						model: 'playtext',
						uuid: playtext.uuid,
						name: playtext.name
					}) END AS playtexts
				ORDER BY otherRoleRel.position
				WITH character, playtexts, production, theatre, castRel, person, role, CASE WHEN otherRole IS NULL THEN [] ELSE
					COLLECT({
						model: 'character',
						uuid: otherCharacter.uuid,
						name: otherRole.name
					}) END AS otherRoles
				ORDER BY castRel.position
				WITH character, playtexts, production, theatre, COLLECT({
						model: 'person',
						uuid: person.uuid,
						name: person.name,
						role: { name: role.name },
						otherRoles: otherRoles
					}) AS performers
				RETURN {
					model: 'character',
					uuid: character.uuid,
					name: character.name,
					playtexts: playtexts,
					productions: CASE WHEN production IS NULL THEN [] ELSE
						COLLECT({
							model: 'production',
							uuid: production.uuid,
							name: production.name,
							theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name },
							performers: performers
						}) END
				} AS character
			`));

		});

	});

});
