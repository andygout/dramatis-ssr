export default instanceProp =>
	instanceProp !== null &&
	typeof instanceProp === 'object' &&
	!Array.isArray(instanceProp) &&
	Object.keys(instanceProp).length > 0;
