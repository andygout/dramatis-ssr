export default instance =>
	!Array.isArray(instance) ?
		instance.constructor.name :
		`${instance[0].constructor.name}s`;
