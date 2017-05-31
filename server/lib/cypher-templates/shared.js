import capitalise from '../capitalise';
import pluralise from '../pluralise';

const getValidateUpdateQuery = model => `
	MATCH (n:${capitalise(model)} { name: $name }) WHERE n.uuid <> $uuid
	RETURN SIGN(COUNT(n)) AS ${model}Count
`;

const getEditQuery = model => `
	MATCH (n:${capitalise(model)} { uuid: $uuid })
	RETURN {
		model: '${model}',
		uuid: n.uuid,
		name: n.name
	} AS ${model}
`;

const getUpdateQuery = model => `
	MATCH (n:${capitalise(model)} { uuid: $uuid })
	SET n.name = $name
	RETURN {
		model: '${model}',
		uuid: n.uuid,
		name: n.name
	} AS ${model}
`;

const getDeleteQuery = model => `
	MATCH (n:${capitalise(model)} { uuid: $uuid })
	WITH n, n.name AS name
	DETACH DELETE n
	RETURN {
		model: '${model}',
		name: name
	} AS ${model}
`;

const getListQuery = model => {

	const theatreRelationship = (model === 'production') ? '-[:PLAYS_AT]->(t:Theatre)' : '';

	const theatreObject = (model === 'production') ? ", theatre: { model: 'theatre', uuid: t.uuid, name: t.name }" : '';

	return `
		MATCH (n:${capitalise(model)})${theatreRelationship}
		RETURN COLLECT({
			model: '${model}',
			uuid: n.uuid,
			name: n.name
			${theatreObject}
		}) AS ${pluralise(model)}
	`;

};

export {
	getValidateUpdateQuery,
	getEditQuery,
	getUpdateQuery,
	getDeleteQuery,
	getListQuery
};
