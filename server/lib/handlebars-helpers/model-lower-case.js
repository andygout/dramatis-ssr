export default instance =>
	!Array.isArray(instance) ?
		instance.model.toLowerCase() :
		`${instance[0].model.toLowerCase()}s`;
