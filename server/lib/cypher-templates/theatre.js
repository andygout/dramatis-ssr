const getValidateDeleteQuery = () => `
	MATCH (t:Theatre { uuid: $uuid })<-[r:PLAYS_AT]-(prd:Production)
	RETURN SIGN(COUNT(r)) AS relationshipCount`;

export {
	getValidateDeleteQuery
};
