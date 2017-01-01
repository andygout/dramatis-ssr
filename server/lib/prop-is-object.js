module.exports = function (instanceProp) {
	return instanceProp !== null &&
	typeof instanceProp === 'object' &&
	Object.keys(instanceProp).length;
};
