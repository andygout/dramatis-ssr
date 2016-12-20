const getModelName = instance => instance.constructor.name.toLowerCase();

const checkIfCreateAction = action => action === 'create';

const hasErrors = instance => instance.errors && Object.keys(instance.errors).length;

const getAlertText = (model, instance, action) => {
	const instanceText = instance.title || instance.name;

	return `${model.toUpperCase()} ${hasErrors(instance) ? 'ERRORS' : action.toUpperCase() + 'D: ' + instanceText}`;
}

const getAlertType = instance => hasErrors(instance) ? 'error' : 'success';

module.exports = function (instance, action) {
	const model = getModelName(instance);

	const isCreateAction = checkIfCreateAction(action);

	const pageTitleText =
		instance.preEditedTitle ||
		instance.title ||
		instance.preEditedName ||
		instance.name;

	return {
		title: isCreateAction ? `New ${model}` : pageTitleText,
		modelName: model.toUpperCase(),
		formAction: `/${model}s${isCreateAction ? '' : '/' + instance.id}`,
		submitValue: `${isCreateAction ? 'Create' : 'Update'} ${model}`,
		alertText: getAlertText(model, instance, action),
		alertType: getAlertType(instance)
	}
};
