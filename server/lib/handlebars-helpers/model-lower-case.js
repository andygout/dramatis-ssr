export default instance =>
	!Array.isArray(instance) ?
		instance.constructor.name.toLowerCase() :
		`${instance[0].constructor.name.toLowerCase()}s`;
