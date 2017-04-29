import capitalise from '../capitalise';
import instanceNamingProp from '../instance-naming-prop';
import pluralise from '../pluralise';

const getValidateUpdateQuery = model => {

	const namingProp = instanceNamingProp(model);

	return `
		MATCH (n:${capitalise(model)} { ${namingProp}: $${namingProp} }) WHERE n.uuid <> $uuid
		RETURN SIGN(COUNT(n)) AS ${model}Count
	`;

};

const getEditQuery = model => {

	const namingProp = instanceNamingProp(model);

	return `
		MATCH (n:${capitalise(model)} { uuid: $uuid })
		RETURN {
			model: '${model}',
			uuid: n.uuid,
			${namingProp}: n.${namingProp}
		} AS ${model}
	`;

};

const getUpdateQuery = model => {

	const namingProp = instanceNamingProp(model);

	return `
		MATCH (n:${capitalise(model)} { uuid: $uuid })
		SET n.${namingProp} = $${namingProp}
		RETURN {
			model: '${model}',
			uuid: n.uuid,
			${namingProp}: n.${namingProp}
		} AS ${model}
	`;

};

const getDeleteQuery = model => {

	const namingProp = instanceNamingProp(model);

	return `
		MATCH (n:${capitalise(model)} { uuid: $uuid })
		WITH n, n.${namingProp} AS ${namingProp}
		DETACH DELETE n
		RETURN {
			model: '${model}',
			${namingProp}: ${namingProp}
		} AS ${model}
	`;

};

const getListQuery = model => {

	const namingProp = instanceNamingProp(model);

	const theatreRelationship = (model === 'production') ? '-[:PLAYS_AT]->(t:Theatre)' : '';

	const theatreObject = (model === 'production') ? ", theatre: { model: 'theatre', uuid: t.uuid, name: t.name }" : '';

	return `
		MATCH (n:${capitalise(model)})${theatreRelationship}
		RETURN COLLECT({
			model: '${model}',
			uuid: n.uuid,
			${namingProp}: n.${namingProp}
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
