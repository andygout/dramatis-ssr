import constants from '../lib/constants';

export default (stringValue, propName) => {

	const stringErrors = [];
	if (stringValue.length < constants.STRING_MIN_LENGTH) stringErrors.push(`${propName} is too short`);
	if (stringValue.length > constants.STRING_MAX_LENGTH) stringErrors.push(`${propName} is too long`);

	return stringErrors;

};
