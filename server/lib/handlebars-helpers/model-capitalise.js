import capitalise from '../capitalise';
import pluralise from '../pluralise';

export default instance =>
	!Array.isArray(instance) ?
		capitalise(instance.model) :
		capitalise(pluralise(instance[0].model));
