import { v4 as uuid } from 'node-uuid';

import esc from '../escape-string';

const getPersonQuery = personName => {

	return personName.length ?
		`MERGE (p:Person { name: '${esc(personName)}' })
		ON CREATE SET p.uuid = '${uuid()}'
		CREATE (prd)<-[:PERFORMS_IN]-(p)` :
		'';

};

const getHandleRelationshipsAndReturnQuery = instance => {

	const personQuery = getPersonQuery(instance.person.name);

	return `
		MERGE (t:Theatre { name: '${esc(instance.theatre.name)}' })
		ON CREATE SET t.uuid = '${uuid()}'
		CREATE (prd)-[:PLAYS_AT]->(t)
		${personQuery}
		RETURN {
			model: 'production',
			uuid: prd.uuid,
			title: prd.title
		} AS production
	`;

};

const getCreateQuery = instance => {

	const handleRelationshipsAndReturn = getHandleRelationshipsAndReturnQuery(instance);

	return `
		CREATE (prd:Production { uuid: '${uuid()}', title: '${esc(instance.title)}' })
		${handleRelationshipsAndReturn}
	`;

};

const getEditQuery = instance => {

	return `
		MATCH (prd:Production { uuid: '${esc(instance.uuid)}' })
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
	`;

};

const getUpdateQuery = instance => {

	const handleRelationshipsAndReturn = getHandleRelationshipsAndReturnQuery(instance);

	return `
		MATCH (prd:Production { uuid: '${esc(instance.uuid)}' })
		OPTIONAL MATCH (prd)-[r]-()
		WITH prd, COLLECT (r) AS rels
		FOREACH (r IN rels | DELETE r)
		SET prd.title = '${esc(instance.title)}'
		${handleRelationshipsAndReturn}
	`;

};

const getShowQuery = instance => {

	return `
		MATCH (prd:Production { uuid: '${esc(instance.uuid)}' })
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
	`;

};

export {
	getCreateQuery,
	getEditQuery,
	getUpdateQuery,
	getShowQuery
};
