const getValidateDeleteQuery = () => `
	MATCH (theatre:Theatre { uuid: $uuid })<-[relationship:PLAYS_AT]-(production:Production)
	RETURN SIGN(COUNT(relationship)) AS relationshipCount
`;

const getShowQuery = () => `
	MATCH (theatre:Theatre { uuid: $uuid })
	OPTIONAL MATCH (theatre)<-[:PLAYS_AT]-(production:Production)
	WITH theatre, CASE WHEN production IS NULL THEN [] ELSE
		COLLECT({ model: 'production', uuid: production.uuid, title: production.title }) END AS productions
	RETURN {
		model: 'theatre',
		uuid: theatre.uuid,
		name: theatre.name,
		productions: productions
	} AS theatre
`;

export {
	getValidateDeleteQuery,
	getShowQuery
};
