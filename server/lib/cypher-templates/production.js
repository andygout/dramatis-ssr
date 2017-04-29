const nullRolesValue = action => (action === 'show') ? '{ name: \'Performer\' }' : '';

const additionalProps = (model, action) =>
	(action === 'show') ? `model: '${model}', uuid: ${model.charAt(0)}.uuid, ` : '';

const getCreateUpdateQuery = action => {

	const createUpdateQueryOpeningMap = {
		create: 'CREATE (prd:Production { uuid: $uuid, title: $title })',
		update: `MATCH (prd:Production { uuid: $uuid })
				OPTIONAL MATCH (:Person)-[:PERFORMS_AS { prodUuid: $uuid }]-(r:Role)
				WITH prd, COLLECT(r) AS roles
				FOREACH (r in roles | DETACH DELETE r)
				WITH prd
				OPTIONAL MATCH (prd)-[r]-()
				WITH prd, COLLECT(r) AS rels
				FOREACH (r IN rels | DELETE r)
				SET prd.title = $title`
	};

	return `
		${createUpdateQueryOpeningMap[action]}
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
	`;

};

const getEditShowQuery = action => `
	MATCH (prd:Production { uuid: $uuid })-[:PLAYS_AT]->(t:Theatre)
	OPTIONAL MATCH (prd)<-[castRel:PERFORMS_IN]-(p:Person)
	OPTIONAL MATCH (p)-[roleRel:PERFORMS_AS { prodUuid: $uuid }]->(r:Role)
	WITH prd, t, castRel, p, roleRel, r
	ORDER BY roleRel.position
	WITH prd, t, castRel, p,
		CASE WHEN r IS NULL THEN [${nullRolesValue(action)}] ELSE COLLECT({ name: r.name }) END AS roles
	ORDER BY castRel.position
	RETURN {
		model: 'production',
		uuid: prd.uuid,
		title: prd.title,
		theatre: { ${additionalProps('theatre', action)} name: t.name },
		cast: CASE WHEN p IS NULL THEN [] ELSE
			COLLECT({ ${additionalProps('person', action)} name: p.name, roles: roles }) END
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
