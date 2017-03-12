import instanceNamingValue from './instance-naming-value';

const getPageTitleText = instance => instance.pageTitleText || instanceNamingValue(instance);

const getDocumentTitle = (instance, action, model, title) => {

	let documentTitle = title;

	if (action === 'update') documentTitle = `Edit: ${documentTitle}`;

	if (action !== 'create') {

		if (model === 'production') documentTitle += ` (${instance.theatre.name})`;

		documentTitle += ` (${model})`;

	}

	return ` | ${documentTitle}`;

};

export default (instance, action) => {

	const model = instance.model.toLowerCase();

	const isCreateAction = (action === 'create');

	const title = isCreateAction ? `New ${model}` : getPageTitleText(instance);

	return {
		documentTitle: instance.documentTitle || getDocumentTitle(instance, action, model, title),
		title,
		model,
		formAction: `/${model}s${isCreateAction ? '' : '/' + instance.uuid}`,
		submitValue: `${isCreateAction ? 'Create' : 'Update'} ${model}`
	};

};
