const modelNamingPropMap = require('../model-naming-prop-map');

module.exports = function (instance) {

	const model = instance.constructor.name.toLowerCase();

	return instance[modelNamingPropMap[model]];

};
