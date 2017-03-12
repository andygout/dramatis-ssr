import instanceNamingValue from './instance-naming-value';

export default (instance, action) => {

	let text = `${instance.model.toUpperCase()} ${instance.hasError ?
		'ERRORS' :
		action.toUpperCase() + 'D: ' + instanceNamingValue(instance)}
	`.trim();

	if (instance.errors && instance.errors.associations) text += `
		: Dependent associations exist with ${instance.errors.associations.join()}
	`.trim();

	const type = instance.hasError ? 'error' : 'success';

	return { text, type };

};
