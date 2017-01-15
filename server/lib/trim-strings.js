const propIsObject = require('./prop-is-object');

const trimStrings = instance => {
	for (const prop in instance) {
		if (instance.hasOwnProperty(prop)) {
			instance[prop] = propIsObject(instance[prop]) ?
				trimStrings(instance[prop]) :
				typeof instance[prop] === 'string' ? instance[prop].trim() : instance[prop];
		}
	}
	return instance;
};

module.exports = function (instance) {
	trimStrings(instance);
};
