const getShowQuery = () => `
	MATCH (p:Person { uuid: $uuid })
	OPTIONAL MATCH (p)-[:PERFORMS_IN]->(prd:Production)-[:PLAYS_AT]->(t:Theatre)
	WITH p, prd, t
	OPTIONAL MATCH (p)-[roleRel:PERFORMS_AS { prodUuid: prd.uuid }]->(r:Role)
	WITH p, prd, t, roleRel, r
	ORDER BY roleRel.position
	WITH p, prd, t, CASE WHEN r IS NULL THEN [{ name: 'Performer' }] ELSE COLLECT({ name: r.name }) END AS roles
	WITH p, CASE WHEN prd IS NULL THEN [] ELSE
		COLLECT({
			model: 'production',
			uuid: prd.uuid,
			title: prd.title,
			theatre: { model: 'theatre', uuid: t.uuid, name: t.name },
			roles: roles
		}) END AS productions
	RETURN {
		model: 'person',
		uuid: p.uuid,
		name: p.name,
		productions: productions
	} AS person
`;

export {
	getShowQuery
};
