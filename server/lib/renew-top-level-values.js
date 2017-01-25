module.exports = function (instance, newValues) {

	for (const prop in instance) {

		if (instance.hasOwnProperty(prop) && newValues.hasOwnProperty(prop)) instance[prop] = newValues[prop];

	}

};
