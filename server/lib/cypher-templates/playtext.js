const getShowQuery = () => `
	MATCH (playtext:Playtext { uuid: $uuid })
	OPTIONAL MATCH (playtext)<-[:PRODUCTION_OF]-(production:Production)-[:PLAYS_AT]->(theatre:Theatre)
	WITH playtext, production, theatre
	WITH playtext, CASE WHEN production IS NULL THEN [] ELSE
		COLLECT({
			model: 'production',
			uuid: production.uuid,
			name: production.name,
			theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name }
		}) END AS productions
	RETURN {
		model: 'playtext',
		uuid: playtext.uuid,
		name: playtext.name,
		productions: productions
	} AS playtext
`;

export {
	getShowQuery
};
