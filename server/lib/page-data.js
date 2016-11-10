const getModelName = instance => instance.constructor.name.toLowerCase();

const checkIfCreateAction = action => action === 'create';

const hasErrors = instance => instance.errors && Object.keys(instance.errors).length;

const getAlertText = (model, instance, action) =>
	`${model.toUpperCase()} ${hasErrors(instance) ? 'ERRORS' : action.toUpperCase() + 'D: ' + instance.title}`

const getAlertType = instance => hasErrors(instance) ? 'error' : 'success'

const getPageData = (instance, action) => {
	const model = getModelName(instance);

	const isCreateAction = checkIfCreateAction(action);

	return {
		title: isCreateAction ? `New ${model}` : `${instance.preEditedTitle || instance.title}`,
		modelName: model.toUpperCase(),
		formAction: `/${model}s${isCreateAction ? '' : '/' + instance.id}`,
		submitValue: `${isCreateAction ? 'Create' : 'Update'} ${model}`,
		alertText: getAlertText(model, instance, action),
		alertType: getAlertType(instance)
	}
}

export { getPageData }
