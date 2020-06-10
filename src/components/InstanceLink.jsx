import { h } from 'preact';

import { pluralise } from '../lib/strings';

export default props => {

	const { instance: { model, uuid, name } } = props;

	const pluralisedModel = pluralise(model);

	const instancePath = `/${pluralisedModel}/${uuid}`;

	return (
		<a href={instancePath}>
			{ name }
		</a>
	);

};
