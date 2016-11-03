const getModelName = instance => instance.constructor.name.toLowerCase();

const hasErrors = instance => instance.errors && Object.keys(instance.errors).length;

const getAlertText = (model, instance, action) =>
	`${model.toUpperCase()} ${hasErrors(instance) ? 'ERRORS' : action + ': ' + instance.title}`

const getAlertType = instance => hasErrors(instance) ? 'error' : 'success'

const newFormPageData = instance => {
	const model = getModelName(instance);
	return {
		title: `New ${model}`,
		formAction: `/${model}s`,
		submitValue: `Create ${model}`,
		alertText: getAlertText(model, instance, 'CREATED'),
		alertType: getAlertType(instance)
	}
}

const editFormPageData = instance => {
	const model = getModelName(instance);
	return {
		title: `${instance.preEditedTitle || instance.title}`,
		formAction: `/${model}s/${instance.id}`,
		submitValue: `Update ${model}`,
		alertText: getAlertText(model, instance, 'UPDATED'),
		alertType: getAlertType(instance)
	}
}

const deletePageData = instance => {
	const model = getModelName(instance);
	return {
		alertText: getAlertText(model, instance, 'DELETED'),
		alertType: getAlertType(instance)
	}
}

export { newFormPageData, editFormPageData, deletePageData }
