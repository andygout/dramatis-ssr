import instanceLink from '../instance-link';

export default instances => {

	return instances.map(instance =>
			(instance.model && instance.uuid) ? instanceLink(instance) : instance.name
		)
		.join(' / ');

};
