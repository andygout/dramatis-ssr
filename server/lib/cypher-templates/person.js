const getShowQuery = () => `
	MATCH (person:Person { uuid: $uuid })
	OPTIONAL MATCH (person)-[:PERFORMS_IN]->(production:Production)-[:PLAYS_AT]->(theatre:Theatre)
	WITH person, production, theatre
	OPTIONAL MATCH (person)-[roleRel:PERFORMS_AS { prodUuid: production.uuid }]->(role:Role)
	WITH person, production, theatre, roleRel, role
	ORDER BY roleRel.position
	WITH person, production, theatre,
		CASE WHEN role IS NULL THEN [{ name: 'Performer' }] ELSE COLLECT({ name: role.name }) END AS roles
	WITH person, CASE WHEN production IS NULL THEN [] ELSE
		COLLECT({
			model: 'production',
			uuid: production.uuid,
			title: production.title,
			theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name },
			roles: roles
		}) END AS productions
	RETURN {
		model: 'person',
		uuid: person.uuid,
		name: person.name,
		productions: productions
	} AS person
`;

export {
	getShowQuery
};
