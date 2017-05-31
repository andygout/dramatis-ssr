const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const removeWhitespace = require('../../../spec-helpers').removeWhitespace;

const getProductionInstanceFixture = require('../../../fixtures/productions/get-instance');

const subject = require('../../../../dist/lib/cypher-templates/production');

describe('Cypher Templates Production module', () => {

	describe('getCreateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getCreateQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				CREATE (production:Production { uuid: $uuid, name: $name })
				MERGE (theatre:Theatre { name: $theatre.name })
				ON CREATE SET theatre.uuid = $theatre.uuid
				CREATE (production)-[:PLAYS_AT]->(theatre)
				FOREACH (item IN CASE WHEN $playtext.name <> '' THEN [1] ELSE [] END |
					MERGE (playtext:Playtext { name: $playtext.name })
					ON CREATE SET playtext.uuid = $playtext.uuid
					CREATE (production)-[:PRODUCTION_OF]->(playtext)
				)
				FOREACH (castMember IN $cast |
					MERGE (person:Person { name: castMember.name })
					ON CREATE SET person.uuid = castMember.uuid
					CREATE (production)<-[:PERFORMS_IN { position: castMember.position }]-(person)
					FOREACH (role in castMember.roles |
						CREATE (person)-[:PERFORMS_AS { position: role.position, prodUuid: $uuid }]->(:Role { name: role.name })
					)
				)
				RETURN {
					model: 'production',
					uuid: production.uuid,
					name: production.name
				} AS production
			`));

		});

	});

	describe('getEditQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getEditQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (production:Production { uuid: $uuid })-[:PLAYS_AT]->(theatre:Theatre)
				OPTIONAL MATCH (production)-[:PRODUCTION_OF]->(playtext:Playtext)
				OPTIONAL MATCH (production)<-[castRel:PERFORMS_IN]-(person:Person)
				OPTIONAL MATCH (person)-[roleRel:PERFORMS_AS { prodUuid: $uuid }]->(role:Role)
				WITH production, theatre, playtext, castRel, person, roleRel, role
				ORDER BY roleRel.position
				WITH production, theatre, playtext, castRel, person,
					CASE WHEN role IS NULL THEN [] ELSE COLLECT({ name: role.name }) END AS roles
				ORDER BY castRel.position
				RETURN {
					model: 'production',
					uuid: production.uuid,
					name: production.name,
					theatre: { name: theatre.name },
					playtext: CASE WHEN playtext IS NULL THEN '' ELSE { name: playtext.name } END,
					cast: CASE WHEN person IS NULL THEN [] ELSE COLLECT({ name: person.name, roles: roles }) END
				} AS production
			`));

		});

	});

	describe('getUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getUpdateQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (production:Production { uuid: $uuid })
				OPTIONAL MATCH (:Person)-[:PERFORMS_AS { prodUuid: $uuid }]-(role:Role)
				WITH production, COLLECT(role) AS roles
				FOREACH (role in roles | DETACH DELETE role)
				WITH production
				OPTIONAL MATCH (production)-[relationship]-()
				WITH production, COLLECT(relationship) AS relationships
				FOREACH (relationship IN relationships | DELETE relationship)
				SET production.name = $name
				MERGE (theatre:Theatre { name: $theatre.name })
				ON CREATE SET theatre.uuid = $theatre.uuid
				CREATE (production)-[:PLAYS_AT]->(theatre)
				FOREACH (item IN CASE WHEN $playtext.name <> '' THEN [1] ELSE [] END |
					MERGE (playtext:Playtext { name: $playtext.name })
					ON CREATE SET playtext.uuid = $playtext.uuid
					CREATE (production)-[:PRODUCTION_OF]->(playtext)
				)
				FOREACH (castMember IN $cast |
					MERGE (person:Person { name: castMember.name })
					ON CREATE SET person.uuid = castMember.uuid
					CREATE (production)<-[:PERFORMS_IN { position: castMember.position }]-(person)
					FOREACH (role in castMember.roles |
						CREATE (person)-[:PERFORMS_AS { position: role.position, prodUuid: $uuid }]->(:Role { name: role.name })
					)
				)
				RETURN {
					model: 'production',
					uuid: production.uuid,
					name: production.name
				} AS production
			`));

		});

	});

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (production:Production { uuid: $uuid })-[:PLAYS_AT]->(theatre:Theatre)
				OPTIONAL MATCH (production)-[:PRODUCTION_OF]->(playtext:Playtext)
				OPTIONAL MATCH (production)<-[castRel:PERFORMS_IN]-(person:Person)
				OPTIONAL MATCH (person)-[roleRel:PERFORMS_AS { prodUuid: $uuid }]->(role:Role)
				WITH production, theatre, playtext, castRel, person, roleRel, role
				ORDER BY roleRel.position
				WITH production, theatre, playtext, castRel, person,
					CASE WHEN role IS NULL THEN [{ name: 'Performer' }] ELSE COLLECT({ name: role.name }) END AS roles
				ORDER BY castRel.position
				RETURN {
					model: 'production',
					uuid: production.uuid,
					name: production.name,
					theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name },
					playtext: CASE WHEN playtext IS NULL THEN null ELSE { model: 'playtext', uuid: playtext.uuid, name: playtext.name } END,
					cast: CASE WHEN person IS NULL THEN [] ELSE
						COLLECT({ model: 'person', uuid: person.uuid, name: person.name, roles: roles }) END
				} AS production
			`));

		});

	});

});
