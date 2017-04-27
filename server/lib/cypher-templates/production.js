const additionalProps = (model, action) =>
	(action === 'show') ? `model: '${model}', uuid: ${model.charAt(0)}.uuid, ` : '';

const getRelationshipsAndReturnQuery = () => `
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
	} AS production`;

const getEditShowQuery = action => `
	MATCH (prd:Production { uuid: $uuid })
	MATCH (prd)-[:PLAYS_AT]->(t:Theatre)
	OPTIONAL MATCH (prd)<-[r:PERFORMS_IN]-(p:Person)
	WITH prd, t, p, r
	ORDER BY r.position
	WITH prd, t, CASE WHEN p IS NOT NULL THEN
		COLLECT({ ${additionalProps('person', action)} name: p.name })
	ELSE
		[]
	END AS cast
	RETURN {
		model: 'production',
		uuid: prd.uuid,
		title: prd.title,
		theatre: { ${additionalProps('theatre', action)} name: t.name },
		cast: cast
	} AS production`;

const getCreateQuery = () => `
	CREATE (prd:Production { uuid: $uuid, title: $title })
	${getRelationshipsAndReturnQuery()}`;

const getEditQuery = () => getEditShowQuery('edit');

const getUpdateQuery = () => `
	MATCH (prd:Production { uuid: $uuid })
	OPTIONAL MATCH (prd)-[r]-()
	WITH prd, COLLECT (r) AS rels
	FOREACH (r IN rels | DELETE r)
	SET prd.title = $title
	${getRelationshipsAndReturnQuery()}`;

const getShowQuery = () => getEditShowQuery('show');

export {
	getCreateQuery,
	getEditQuery,
	getUpdateQuery,
	getShowQuery
};
