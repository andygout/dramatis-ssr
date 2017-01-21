const pageTitleTextMap = require('../page-title-text-map');

module.exports = function (instance) {

	const model = instance.constructor.name.toLowerCase();

	return instance[pageTitleTextMap[model]];

};
