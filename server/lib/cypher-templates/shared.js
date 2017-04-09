import capitalise from '../capitalise';
import esc from '../escape-string';
import instanceNamingProp from '../instance-naming-prop';
import instanceNamingValue from '../instance-naming-value';
import pluralise from '../pluralise';

const theatreObjectString = ", theatre: { model: 'theatre', uuid: t.uuid, name: t.name }";

const getQueryData = instance => {

	return {
		model: instance.model,
		namingProp: instanceNamingProp(instance.model),
		namingValue: esc(instanceNamingValue(instance)),
		uuid: esc(instance.uuid)
	};

};

const getProductionsData = model => {

	const productionRelationships = {
		'theatre': '(n)<-[:PLAYS_AT]-(prd:Production)',
		'person': '(n)-[:PERFORMS_IN]->(prd:Production)-[:PLAYS_AT]->(t:Theatre)'
	};

	return {
		productionRelationship: productionRelationships[model],
		theatreObject: (model !== 'theatre') ? theatreObjectString : ''
	};

};

const getValidateUpdateQuery = instance => {

	const data = getQueryData(instance);

	return `
		MATCH (n:${capitalise(data.model)} { ${data.namingProp}: '${data.namingValue}' }) WHERE n.uuid <> '${data.uuid}'
		RETURN SIGN(COUNT(n)) AS ${data.model}Count
	`;

};

const getEditQuery = instance => {

	const data = getQueryData(instance);

	return `
		MATCH (n:${capitalise(data.model)} { uuid: '${data.uuid}' })
		RETURN {
			model: '${data.model}',
			uuid: n.uuid,
			${data.namingProp}: n.${data.namingProp}
		} AS ${data.model}
	`;

};

const getUpdateQuery = instance => {

	const data = getQueryData(instance);

	return `
		MATCH (n:${capitalise(data.model)} { uuid: '${data.uuid}' })
		SET n.${data.namingProp} = '${data.namingValue}'
		RETURN {
			model: '${data.model}',
			uuid: n.uuid,
			${data.namingProp}: n.${data.namingProp}
		} AS ${data.model}
	`;

};

const getDeleteQuery = instance => {

	const data = getQueryData(instance);

	return `
		MATCH (n:${capitalise(data.model)} { uuid: '${data.uuid}' })
		WITH n, n.${data.namingProp} AS ${data.namingProp}
		DETACH DELETE n
		RETURN {
			model: '${data.model}',
			${data.namingProp}: ${data.namingProp}
		} AS ${data.model}
	`;

};

const getShowQuery = instance => {

	const data = Object.assign(getQueryData(instance), getProductionsData(instance.model));

	return `
		MATCH (n:${capitalise(data.model)} { uuid: '${data.uuid}' })
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
			model: '${data.model}',
			uuid: n.uuid,
			${data.namingProp}: n.${data.namingProp},
			productions: productions
		} AS ${data.model}
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
