import { h } from 'preact';

import { irregularPluralNounsMap } from '../utils/constants';

export default function (props) {

	const { instance: { model, uuid, name } } = props;

	const pluralisedModel = irregularPluralNounsMap[model] || `${model}s`;

	const instancePath = `/${pluralisedModel}/${uuid}`;

	return (
		<a href={instancePath}>
			{ name }
		</a>
	);

};
