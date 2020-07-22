import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { pluralise } from '../lib/strings';

const InstanceLink = props => {

	const { instance: { model, uuid, name } } = props;

	const pluralisedModel = pluralise(model);

	const instancePath = `/${pluralisedModel}/${uuid}`;

	return (
		<a href={instancePath}>
			{ name }
		</a>
	);

};

export default InstanceLink;
