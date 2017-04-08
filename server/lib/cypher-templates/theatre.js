import esc from '../escape-string';

const getValidateDeleteQuery = uuid => {

	return `
		MATCH (t:Theatre { uuid: '${esc(uuid)}' })<-[r:PLAYS_AT]-(prd:Production)
		RETURN SIGN(COUNT(r)) AS relationshipCount
	`;

};

export {
	getValidateDeleteQuery
};
