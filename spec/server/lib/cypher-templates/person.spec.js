const expect = require('chai').expect;

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const subject = require('../../../../dist/lib/cypher-templates/person');

describe('Cypher Templates Person module', () => {

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (person:Person { uuid: $uuid })
				OPTIONAL MATCH (person)-[:PERFORMS_IN]->(production:Production)-[:PLAYS_AT]->(theatre:Theatre)
				OPTIONAL MATCH (person)-[roleRel:PERFORMS_AS { prodUuid: production.uuid }]->(role:Role)
				OPTIONAL MATCH (role)<-[:PERFORMS_AS]-(person)-[:PERFORMS_IN]->(production)-[:PRODUCTION_OF]->
					(:Playtext)-[:INCLUDES_CHARACTER]->(character:Character) WHERE role.name = character.name
				WITH person, production, theatre, roleRel, role, character
				ORDER BY roleRel.position
				WITH person, production, theatre, CASE WHEN role IS NULL THEN [{ name: 'Performer' }] ELSE
					COLLECT({ model: 'character', uuid: character.uuid, name: role.name }) END AS roles
				WITH person, CASE WHEN production IS NULL THEN [] ELSE
					COLLECT({
						model: 'production',
						uuid: production.uuid,
						name: production.name,
						theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name },
						roles: roles
					}) END AS productions
				RETURN {
					model: 'person',
					uuid: person.uuid,
					name: person.name,
					productions: productions
				} AS person
			`));

		});

	});

});
