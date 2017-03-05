import propIsObject from './prop-is-object';

const renewValuesLevel = (instance, newValues, associations) => {

	for (const prop in instance) {
		if (instance.hasOwnProperty(prop) && newValues.hasOwnProperty(prop)) {

			instance[prop] = propIsObject(instance[prop]) ?
				renewValuesLevel(instance[prop], newValues[prop], associations) :
				(prop in associations && Array.isArray(instance[prop]) && Array.isArray(newValues[prop])) ?
					newValues[prop].map(constructorProps => new associations[prop](constructorProps)) :
					newValues[prop];

		}
	}

	return instance;

};

export default (instance, newValues) => {

	return renewValuesLevel(instance, newValues, instance.getAssociations());

};
