module.exports = function (instance) {

	return !Array.isArray(instance) ?
		instance.constructor.name :
		`${instance[0].constructor.name}s`;

};
