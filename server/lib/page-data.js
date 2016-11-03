const newFormPageData = (model) =>
	({
		title: `New ${model}`,
		formAction: `/${model}s`,
		submitValue: `Create ${model}`
	})

const editFormPageData = (model, instance) =>
	({
		title: `${instance.preEditedTitle || instance.title}`,
		formAction: `/${model}s/${instance.id}`,
		submitValue: `Update ${model}`
	})

export { newFormPageData, editFormPageData }
