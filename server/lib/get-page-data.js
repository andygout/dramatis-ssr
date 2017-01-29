const modelNamingPropMap = require('./model-naming-prop-map');

const getModelName = instance => instance.constructor.name.toLowerCase();

const checkIfCreateAction = action => action === 'create';

const getPageTitleText = (model, instance) => instance.pageTitleText || instance[modelNamingPropMap[model]];

const getAlertText = (model, instance, action) => {

	const instanceText = instance.title || instance.name;

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

module.exports = function (instance, action) {

	const model = getModelName(instance);

	const isCreateAction = checkIfCreateAction(action);

	return {
		title: isCreateAction ? `New ${model}` : getPageTitleText(model, instance),
		modelName: model,
		modelRoute: `${model}s`,
		instanceRoute: `/${model}s/${instance.id}`,
		action,
		formAction: `/${model}s${isCreateAction ? '' : '/' + instance.id}`,
		submitValue: `${isCreateAction ? 'Create' : 'Update'} ${model}`,
		alertText: getAlertText(model, instance, action),
		alertType: getAlertType(instance)
	};

};
