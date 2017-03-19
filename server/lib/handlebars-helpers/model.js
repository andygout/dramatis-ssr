import pluralise from '../pluralise';

export default instance =>
	!Array.isArray(instance) ?
		instance.model :
		pluralise(instance[0].model);
