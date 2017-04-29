import constants from '../config/constants';

export default (stringValue, propName, opts = {}) => {

	const stringErrors = [];

	if (opts.required && (stringValue.length < constants.STRING_MIN_LENGTH)) {

		stringErrors.push(`${propName} is too short`);

	}

	if (stringValue.length > constants.STRING_MAX_LENGTH) stringErrors.push(`${propName} is too long`);

	return stringErrors;

};
