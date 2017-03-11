import { setAlert } from './alert';
import instanceNamingValue from './instance-naming-value';

export default (req, instance, action) => {

	let alertText = `${instance.model.toUpperCase()} ${instance.hasError ?
		'ERRORS' :
		action.toUpperCase() + 'D: ' + instanceNamingValue(instance)}
	`.trim();

	if (instance.errors && instance.errors.associations) alertText += `
		: Dependent associations exist with ${instance.errors.associations.join()}
	`.trim();

	const alertType = instance.hasError ? 'error' : 'success';

	setAlert(req, alertText, alertType);

};
