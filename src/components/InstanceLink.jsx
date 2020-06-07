import { h } from 'preact';

import { IRREGULAR_PLURAL_NOUNS_MAP } from '../utils/constants';

export default function (props) {

	const { instance: { model, uuid, name } } = props;

	const pluralisedModel = IRREGULAR_PLURAL_NOUNS_MAP[model] || `${model}s`;

	const instancePath = `/${pluralisedModel}/${uuid}`;

	return (
		<a href={instancePath}>
			{ name }
		</a>
	);

};
