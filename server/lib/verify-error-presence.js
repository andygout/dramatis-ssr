const propIsObject = require('./prop-is-object');

const propHasErrors = (prop, instanceProp) =>
	prop === 'errors' &&
	instanceProp !== null &&
	typeof instanceProp === 'object' &&
	!Array.isArray(instanceProp) &&
	Object.keys(instanceProp).length;

const searchForErrors = instance => {
	for (const prop in instance) {
		if (instance.hasOwnProperty(prop)) {
			if (propHasErrors(prop, instance[prop])) return true;
			if (propIsObject(instance[prop]) && searchForErrors(instance[prop])) return true;
		}
	}
	return false;
};

module.exports = function (instance) {
	return searchForErrors(instance);
};
