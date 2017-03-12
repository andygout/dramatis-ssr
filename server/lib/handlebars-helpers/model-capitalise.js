import capitalise from '../capitalise';

export default instance =>
	!Array.isArray(instance) ?
		capitalise(instance.model) :
		capitalise(`${instance[0].model}s`);
