const nullRolesValue = action => (action === 'show') ? '{ name: \'Performer\' }' : '';

const additionalProps = (model, action) => (action === 'show') ? `model: '${model}', uuid: ${model}.uuid,` : '';

const nullState = action => (action === 'edit') ? '\'\'': 'null';

const getCreateUpdateQuery = action => {

	const createUpdateQueryOpeningMap = {
		create: 'CREATE (production:Production { uuid: $uuid, name: $name })',
		update: `
			MATCH (production:Production { uuid: $uuid })
			OPTIONAL MATCH (:Person)-[:PERFORMS_AS { prodUuid: $uuid }]-(role:Role)
			WITH production, COLLECT(role) AS roles
			FOREACH (role in roles | DETACH DELETE role)
			WITH production
			OPTIONAL MATCH (production)-[relationship]-()
			WITH production, COLLECT(relationship) AS relationships
			FOREACH (relationship IN relationships | DELETE relationship)
			SET production.name = $name
		`
	};

	return `
		${createUpdateQueryOpeningMap[action]}
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
	`;

};

const getEditShowQuery = action => `
	MATCH (production:Production { uuid: $uuid })-[:PLAYS_AT]->(theatre:Theatre)
	OPTIONAL MATCH (production)-[:PRODUCTION_OF]->(playtext:Playtext)
	OPTIONAL MATCH (production)<-[castRel:PERFORMS_IN]-(person:Person)
	OPTIONAL MATCH (person)-[roleRel:PERFORMS_AS { prodUuid: $uuid }]->(role:Role)
	WITH production, theatre, playtext, castRel, person, roleRel, role
	ORDER BY roleRel.position
	WITH production, theatre, playtext, castRel, person,
		CASE WHEN role IS NULL THEN [${nullRolesValue(action)}] ELSE COLLECT({ name: role.name }) END AS roles
	ORDER BY castRel.position
	RETURN {
		model: 'production',
		uuid: production.uuid,
		name: production.name,
		theatre: { ${additionalProps('theatre', action)} name: theatre.name },
		playtext: CASE WHEN playtext IS NULL THEN ${nullState(action)} ELSE
			{ ${additionalProps('playtext', action)} name: playtext.name } END,
		cast: CASE WHEN person IS NULL THEN [] ELSE
			COLLECT({ ${additionalProps('person', action)} name: person.name, roles: roles }) END
	} AS production
`;

const getCreateQuery = () => getCreateUpdateQuery('create');

const getEditQuery = () => getEditShowQuery('edit');

const getUpdateQuery = () => getCreateUpdateQuery('update');

const getShowQuery = () => getEditShowQuery('show');

export {
	getCreateQuery,
	getEditQuery,
	getUpdateQuery,
	getShowQuery
};
