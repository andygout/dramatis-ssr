const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const getProductionInstanceFixture = require('../../../fixtures/productions/get-instance');

const stubs = {
	nodeUuid: {
		v4: sinon.stub().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
	},
	esc: sinon.stub().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
};

const resetStubs = () => {

	stubs.nodeUuid.v4.reset();
	stubs.esc.reset();

};

beforeEach(() => {

	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../../dist/lib/cypher-templates/production', {
		'node-uuid': stubs.nodeUuid,
		'../escape-string': stubOverrides.esc || stubs.esc
	});

const removeWhitespace = string => string.replace(/\s\s+/g, ' ').trim();

describe('Cypher Templates Production module', () => {

	describe('getCreateQuery function', () => {

		context('related person does not have name', () => {

			it('will return requisite query', () => {

				const productionInstance = getProductionInstanceFixture();

				productionInstance.person.name = '';

				const escStub = sinon.stub();
				escStub
					.onFirstCall().returns('Almeida Theatre')
					.onSecondCall().returns('Hamlet');

				const subject = createSubject({ esc: escStub });

				const result = subject.getCreateQuery(productionInstance);

				expect(escStub.firstCall.calledWithExactly(productionInstance.theatre.name)).to.be.true;
				expect(escStub.secondCall.calledWithExactly(productionInstance.title)).to.be.true;
				expect(removeWhitespace(result)).to.eq(removeWhitespace(`
					CREATE (prd:Production { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', title: 'Hamlet' })
					MERGE (t:Theatre { name: 'Almeida Theatre' })
					ON CREATE SET t.uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
					CREATE (prd)-[:PLAYS_AT]->(t)
					RETURN {
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
					} AS production
				`));

			});

		});

		context('related person has name', () => {

			it('will return requisite query', () => {

				const productionInstance = getProductionInstanceFixture();

				const escStub = sinon.stub();
				escStub
					.onFirstCall().returns('Patrick Stewart')
					.onSecondCall().returns('Almeida Theatre')
					.onThirdCall().returns('Hamlet');

				const subject = createSubject({ esc: escStub });

				const result = subject.getCreateQuery(productionInstance);

				expect(escStub.firstCall.calledWithExactly(productionInstance.person.name)).to.be.true;
				expect(escStub.secondCall.calledWithExactly(productionInstance.theatre.name)).to.be.true;
				expect(escStub.thirdCall.calledWithExactly(productionInstance.title)).to.be.true;
				expect(removeWhitespace(result)).to.eq(removeWhitespace(`
					CREATE (prd:Production { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', title: 'Hamlet' })
					MERGE (t:Theatre { name: 'Almeida Theatre' })
					ON CREATE SET t.uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
					CREATE (prd)-[:PLAYS_AT]->(t)
					MERGE (p:Person { name: 'Patrick Stewart' })
					ON CREATE SET p.uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
					CREATE (prd)<-[:PERFORMS_IN]-(p)
					RETURN {
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
					} AS production
				`));

			});

		});

	});

	describe('getEditQuery function', () => {

		it('will return requisite query', () => {

			const productionInstance = getProductionInstanceFixture();
			const subject = createSubject();
			const result = subject.getEditQuery(productionInstance);
			expect(stubs.esc.calledOnce).to.be.true;
			expect(stubs.esc.calledWithExactly(productionInstance.uuid)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (prd:Production { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				MATCH (prd)-[:PLAYS_AT]->(t:Theatre)
				OPTIONAL MATCH (prd)<-[:PERFORMS_IN]-(p:Person)
				WITH prd, t, CASE WHEN p IS NOT NULL THEN { name: p.name } ELSE { name: '' } END AS person
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title,
					theatre: { name: t.name },
					person: person
				} AS production
			`));

		});

	});

	describe('getUpdateQuery function', () => {

		context('related person does not have name', () => {

			it('will return requisite query', () => {

				const productionInstance = getProductionInstanceFixture();

				productionInstance.person.name = '';

				const escStub = sinon.stub();
				escStub
					.onFirstCall().returns('Almeida Theatre')
					.onSecondCall().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
					.onThirdCall().returns('Hamlet');

				const subject = createSubject({ esc: escStub });

				const result = subject.getUpdateQuery(productionInstance);

				expect(escStub.firstCall.calledWithExactly(productionInstance.theatre.name)).to.be.true;
				expect(escStub.secondCall.calledWithExactly(productionInstance.uuid)).to.be.true;
				expect(escStub.thirdCall.calledWithExactly(productionInstance.title)).to.be.true;
				expect(removeWhitespace(result)).to.eq(removeWhitespace(`
					MATCH (prd:Production { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
					OPTIONAL MATCH (prd)-[r]-()
					WITH prd, COLLECT (r) AS rels
					FOREACH (r IN rels | DELETE r)
					SET prd.title = 'Hamlet'
					MERGE (t:Theatre { name: 'Almeida Theatre' })
					ON CREATE SET t.uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
					CREATE (prd)-[:PLAYS_AT]->(t)
					RETURN {
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
					} AS production
				`));

			});

		});

		context('related person has name', () => {

			it('will return requisite query', () => {

				const productionInstance = getProductionInstanceFixture();

				const escStub = sinon.stub();
				escStub
					.onFirstCall().returns('Patrick Stewart')
					.onSecondCall().returns('Almeida Theatre')
					.onThirdCall().returns('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
					.onCall(3).returns('Hamlet');

				const subject = createSubject({ esc: escStub });

				const result = subject.getUpdateQuery(productionInstance);

				expect(escStub.firstCall.calledWithExactly(productionInstance.person.name)).to.be.true;
				expect(escStub.secondCall.calledWithExactly(productionInstance.theatre.name)).to.be.true;
				expect(escStub.thirdCall.calledWithExactly(productionInstance.uuid)).to.be.true;
				expect(escStub.getCall(3).calledWithExactly(productionInstance.title)).to.be.true;
				expect(removeWhitespace(result)).to.eq(removeWhitespace(`
					MATCH (prd:Production { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
					OPTIONAL MATCH (prd)-[r]-()
					WITH prd, COLLECT (r) AS rels
					FOREACH (r IN rels | DELETE r)
					SET prd.title = 'Hamlet'
					MERGE (t:Theatre { name: 'Almeida Theatre' })
					ON CREATE SET t.uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
					CREATE (prd)-[:PLAYS_AT]->(t)
					MERGE (p:Person { name: 'Patrick Stewart' })
					ON CREATE SET p.uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
					CREATE (prd)<-[:PERFORMS_IN]-(p)
					RETURN {
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
					} AS production
				`));

			});

		});

	});

	describe('getShowQuery function', () => {

		it('will return requisite query', () => {

			const productionInstance = getProductionInstanceFixture();
			const subject = createSubject();
			const result = subject.getShowQuery(productionInstance);
			expect(stubs.esc.calledOnce).to.be.true;
			expect(stubs.esc.calledWithExactly(productionInstance.uuid)).to.be.true;
			expect(removeWhitespace(result)).to.eq(removeWhitespace(`
				MATCH (prd:Production { uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
				MATCH (prd)-[:PLAYS_AT]->(t:Theatre)
				OPTIONAL MATCH (prd)<-[:PERFORMS_IN]-(p:Person)
				WITH prd, t, CASE WHEN p IS NOT NULL THEN
					{ model: 'person', uuid: p.uuid, name: p.name }
				ELSE
					null
				END AS person
				RETURN {
					model: 'production',
					uuid: prd.uuid,
					title: prd.title,
					theatre: {
						model: 'theatre',
						uuid: t.uuid,
						name: t.name
					},
					person: person
				} AS production
			`));

		});

	});

});
