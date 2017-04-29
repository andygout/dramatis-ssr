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
				CREATE (prd:Production { uuid: $uuid, title: $title })
				MERGE (t:Theatre { name: $theatre.name })
				ON CREATE SET t.uuid = $theatre.uuid
				CREATE (prd)-[:PLAYS_AT]->(t)
				FOREACH (castMember IN $cast |
					MERGE (p:Person { name: castMember.name })
					ON CREATE SET p.uuid = castMember.uuid
					CREATE (prd)<-[:PERFORMS_IN { position: castMember.position }]-(p)
					FOREACH (role in castMember.roles |
						CREATE (p)-[:PERFORMS_AS { position: role.position, prodUuid: $uuid }]->
							(r:Role { name: role.name })
					)
				)
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title
				} AS production
			`));

		});

	});

	describe('getEditQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getEditQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (prd:Production { uuid: $uuid })-[:PLAYS_AT]->(t:Theatre)
				OPTIONAL MATCH (prd)<-[castRel:PERFORMS_IN]-(p:Person)
				OPTIONAL MATCH (p)-[roleRel:PERFORMS_AS { prodUuid: $uuid }]->(r:Role)
				WITH prd, t, castRel, p, roleRel, r
				ORDER BY roleRel.position
				WITH prd, t, castRel, p, CASE WHEN r IS NULL THEN [] ELSE COLLECT({ name: r.name }) END AS roles
				ORDER BY castRel.position
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title,
					theatre: { name: t.name },
					cast: CASE WHEN p IS NULL THEN [] ELSE COLLECT({ name: p.name, roles: roles }) END
				} AS production
			`));

		});

	});

	describe('getUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getUpdateQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (prd:Production { uuid: $uuid })
				OPTIONAL MATCH (:Person)-[:PERFORMS_AS { prodUuid: $uuid }]-(r:Role)
				WITH prd, COLLECT(r) AS roles
				FOREACH (r in roles | DETACH DELETE r)
				WITH prd
				OPTIONAL MATCH (prd)-[r]-()
				WITH prd, COLLECT(r) AS rels
				FOREACH (r IN rels | DELETE r)
				SET prd.title = $title
				MERGE (t:Theatre { name: $theatre.name })
				ON CREATE SET t.uuid = $theatre.uuid
				CREATE (prd)-[:PLAYS_AT]->(t)
				FOREACH (castMember IN $cast |
					MERGE (p:Person { name: castMember.name })
					ON CREATE SET p.uuid = castMember.uuid
					CREATE (prd)<-[:PERFORMS_IN { position: castMember.position }]-(p)
					FOREACH (role in castMember.roles |
						CREATE (p)-[:PERFORMS_AS { position: role.position, prodUuid: $uuid }]->
							(r:Role { name: role.name })
					)
				)
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title
				} AS production
			`));

		});

	});

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getShowQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (prd:Production { uuid: $uuid })-[:PLAYS_AT]->(t:Theatre)
				OPTIONAL MATCH (prd)<-[castRel:PERFORMS_IN]-(p:Person)
				OPTIONAL MATCH (p)-[roleRel:PERFORMS_AS { prodUuid: $uuid }]->(r:Role)
				WITH prd, t, castRel, p, roleRel, r
				ORDER BY roleRel.position
				WITH prd, t, castRel, p,
					CASE WHEN r IS NULL THEN [{ name: 'Performer' }] ELSE COLLECT({ name: r.name }) END AS roles
				ORDER BY castRel.position
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title,
					theatre: { model: 'theatre', uuid: t.uuid, name: t.name },
					cast: CASE WHEN p IS NULL THEN [] ELSE
						COLLECT({ model: 'person', uuid: p.uuid, name: p.name, roles: roles }) END
				} AS production
			`));

		});

	});

});
