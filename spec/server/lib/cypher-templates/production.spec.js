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
					CREATE (prd)<-[:PERFORMS_IN { position: castMember.position }]-(p))
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
				MATCH (prd:Production { uuid: $uuid })
				MATCH (prd)-[:PLAYS_AT]->(t:Theatre)
				OPTIONAL MATCH (prd)<-[r:PERFORMS_IN]-(p:Person)
				WITH prd, t, p, r
				ORDER BY r.position
				WITH prd, t, CASE WHEN p IS NOT NULL THEN COLLECT({ name: p.name }) ELSE [] END AS cast
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title,
					theatre: { name: t.name },
					cast: cast
				} AS production
			`));

		});

	});

	describe('getUpdateQuery function', () => {

		it('will return requisite query', () => {

			const result = subject.getUpdateQuery();
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (prd:Production { uuid: $uuid })
				OPTIONAL MATCH (prd)-[r]-()
				WITH prd, COLLECT (r) AS rels
				FOREACH (r IN rels | DELETE r)
				SET prd.title = $title
				MERGE (t:Theatre { name: $theatre.name })
				ON CREATE SET t.uuid = $theatre.uuid
				CREATE (prd)-[:PLAYS_AT]->(t)
				FOREACH (castMember IN $cast |
					MERGE (p:Person { name: castMember.name })
					ON CREATE SET p.uuid = castMember.uuid
					CREATE (prd)<-[:PERFORMS_IN { position: castMember.position }]-(p))
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
				MATCH (prd:Production { uuid: $uuid })
				MATCH (prd)-[:PLAYS_AT]->(t:Theatre)
				OPTIONAL MATCH (prd)<-[r:PERFORMS_IN]-(p:Person)
				WITH prd, t, p, r
				ORDER BY r.position
				WITH prd, t, CASE WHEN p IS NOT NULL THEN
					COLLECT({ model: 'person', uuid: p.uuid, name: p.name })
				ELSE
					[]
				END AS cast
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title,
					theatre: {
						model: 'theatre',
						uuid: t.uuid,
						name: t.name
					},
					cast: cast
				} AS production
			`));

		});

	});

});
