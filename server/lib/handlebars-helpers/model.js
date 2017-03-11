export default instance =>
	!Array.isArray(instance) ?
		instance.model :
		`${instance[0].model}s`;
