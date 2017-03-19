import instanceNamingValue from './instance-naming-value';
import pluralise from './pluralise';

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

	const model = instance.model;

	const isCreateAction = (action === 'create');

	const title = isCreateAction ? `New ${model}` : instance.pageTitle || instanceNamingValue(instance);

	return {
		documentTitle: instance.documentTitle || getDocumentTitle(instance, action, model, title),
		title,
		model,
		formAction: `/${pluralise(model)}${isCreateAction ? '' : '/' + instance.uuid}`,
		submitValue: `${isCreateAction ? 'Create' : 'Update'} ${model}`
	};

};
