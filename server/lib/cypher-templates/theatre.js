const getValidateDeleteQuery = () => `
	MATCH (t:Theatre { uuid: $uuid })<-[r:PLAYS_AT]-(prd:Production)
	RETURN SIGN(COUNT(r)) AS relationshipCount
`;

const getShowQuery = () => `
	MATCH (t:Theatre { uuid: $uuid })
	OPTIONAL MATCH (t)<-[:PLAYS_AT]-(prd:Production)
	WITH t, CASE WHEN prd IS NULL THEN [] ELSE
		COLLECT({ model: 'production', uuid: prd.uuid, title: prd.title }) END AS productions
	RETURN {
		model: 'theatre',
		uuid: t.uuid,
		name: t.name,
		productions: productions
	} AS theatre
`;

export {
	getValidateDeleteQuery,
	getShowQuery
};
