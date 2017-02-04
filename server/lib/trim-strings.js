import propIsObject from './prop-is-object';

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

export default function (instance) {

	trimStrings(instance);

};
