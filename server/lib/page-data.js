const getModelName = instance => instance.constructor.name.toLowerCase();

const newFormPageData = instance => {
	const model = getModelName(instance);
	return {
		title: `New ${model}`,
		formAction: `/${model}s`,
		submitValue: `Create ${model}`
	}
}

const editFormPageData = instance => {
	const model = getModelName(instance);
	return {
		title: `${instance.preEditedTitle || instance.title}`,
		formAction: `/${model}s/${instance.id}`,
		submitValue: `Update ${model}`
	}
}

export { newFormPageData, editFormPageData }
