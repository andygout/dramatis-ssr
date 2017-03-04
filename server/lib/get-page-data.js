import modelNamingPropMap from './model-naming-prop-map';

const getModelName = instance => instance.constructor.name.toLowerCase();

const checkIfCreateAction = action => action === 'create';

const getPageTitleText = (model, instance) => instance.pageTitleText || instance[modelNamingPropMap[model]];

const getDocumentTitle = (instance, action, model, title) => {

	let documentTitle = title;

	if (action === 'update') documentTitle = `Edit: ${documentTitle}`;

	if (action !== 'create') {

		if (model === 'production') documentTitle += ` (${instance.theatre.name})`;

		documentTitle += ` (${model})`;

	}

	return ` | ${documentTitle}`;

};

const getAlertText = (model, instance, action) => {

	const instanceText = instance[modelNamingPropMap[model]];

	let alertText = `${model.toUpperCase()} ${instance.hasError ?
		'ERRORS' :
		action.toUpperCase() + 'D: ' + instanceText}
	`.trim();

	if (instance.errors.associations) alertText += `
		: Dependent associations exist with ${instance.errors.associations.join()}
	`.trim();

	return alertText;

};

const getAlertType = instance => instance.hasError ? 'error' : 'success';

export default (instance, action) => {

	const model = getModelName(instance);

	const isCreateAction = checkIfCreateAction(action);

	const title = isCreateAction ? `New ${model}` : getPageTitleText(model, instance);

	return {
		documentTitle: getDocumentTitle(instance, action, model, title),
		title,
		modelName: model,
		modelRoute: `${model}s`,
		instanceRoute: `/${model}s/${instance.uuid}`,
		action,
		formAction: `/${model}s${isCreateAction ? '' : '/' + instance.uuid}`,
		submitValue: `${isCreateAction ? 'Create' : 'Update'} ${model}`,
		alertText: getAlertText(model, instance, action),
		alertType: getAlertType(instance)
	};

};
