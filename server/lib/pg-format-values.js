const format = require('pg-format');
const propIsObject = require('./prop-is-object');

const convertToPgFormat = instance => {
	for (const prop in instance) {
		if (instance.hasOwnProperty(prop)) {
			instance[prop] = propIsObject(instance[prop]) ?
				convertToPgFormat(instance[prop]) :
				format.literal(instance[prop]);
		}
	}
	return instance;
}

module.exports = function (instance) {
	return convertToPgFormat(instance);
};
