import capitalise from './capitalise';
import pluralise from './pluralise';

const getDocumentTitle = (instance, action, title, opts) => {

	let documentTitle = title;

	if (action === 'update') documentTitle = `Edit: ${documentTitle}`;

	if (['update', 'show'].includes(action)) {

		if (instance.model === 'production') documentTitle += ` (${instance.theatre.name})`;

		documentTitle += ` (${instance.model})`;

	}

	if (opts.pluralisedModel && opts.pluralisedModel === 'productions') documentTitle = 'Home';

	return documentTitle;

};

export default (instance, action, opts = {}) => {

	const pageData = {};

	const isCreateAction = (action === 'create');

	const title = isCreateAction ?
		`New ${instance.model}` :
		action === 'list' ?
			capitalise(opts.pluralisedModel) :
			instance.pageTitle || instance.name;

	const documentTitle = instance.documentTitle || getDocumentTitle(instance, action, title, opts);

	if (['show', 'create', 'update'].includes(action)) pageData.model = instance.model;

	if (['create', 'update'].includes(action)) {

		pageData.formAction = `/${pluralise(instance.model)}${isCreateAction ? '' : '/' + instance.uuid}`;

		pageData.submitValue = `${capitalise(action)} ${instance.model}`;

	}

	return Object.assign({ documentTitle, title }, pageData);

};
