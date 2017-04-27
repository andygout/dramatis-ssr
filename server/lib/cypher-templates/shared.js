import capitalise from '../capitalise';
import instanceNamingProp from '../instance-naming-prop';
import pluralise from '../pluralise';

const theatreObjectString = ", theatre: { model: 'theatre', uuid: t.uuid, name: t.name }";

const getProductionsData = model => {

	const productionRelationshipsMap = {
		theatre: '(n)<-[:PLAYS_AT]-(prd:Production)',
		person: '(n)-[:PERFORMS_IN]->(prd:Production)-[:PLAYS_AT]->(t:Theatre)'
	};

	return {
		productionRelationship: productionRelationshipsMap[model],
		theatreObject: (model !== 'theatre') ? theatreObjectString : ''
	};

};

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

const getShowQuery = model => {

	const data = Object.assign({ namingProp: instanceNamingProp(model) }, getProductionsData(model));

	return `
		MATCH (n:${capitalise(model)} { uuid: $uuid })
		OPTIONAL MATCH ${data.productionRelationship}
		WITH n, CASE WHEN prd IS NOT NULL THEN
			COLLECT({
				model: 'production',
				uuid: prd.uuid,
				title: prd.title
				${data.theatreObject}
			})
		ELSE
			[]
		END AS productions
		RETURN {
			model: '${model}',
			uuid: n.uuid,
			${data.namingProp}: n.${data.namingProp},
			productions: productions
		} AS ${model}
	`;

};

const getListQuery = model => {

	const namingProp = instanceNamingProp(model);

	const theatreRelationship = (model === 'production') ? '-[:PLAYS_AT]->(t:Theatre)' : '';

	const theatreObject = (model === 'production') ? theatreObjectString : '';

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
	getShowQuery,
	getListQuery
};
