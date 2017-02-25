import propIsObject from './prop-is-object';

const renewValuesLevel = (instance, newValues) => {

	for (const prop in instance) {
		if (instance.hasOwnProperty(prop) && newValues.hasOwnProperty(prop)) {

			instance[prop] = propIsObject(instance[prop]) ?
				renewValuesLevel(instance[prop], newValues[prop]) :
				newValues[prop]

		}
	}

	return instance;

};

export default (instance, newValues) => {

	renewValuesLevel(instance, newValues);

};
