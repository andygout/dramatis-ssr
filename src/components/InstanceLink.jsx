import React from 'react';

import { irregularPluralNounsMap } from '../utils/constants';

export default function (props) {

	const { instance: { model, uuid, name } } = props;

	const instancePath = `/${irregularPluralNounsMap[model] || model + 's'}/${uuid}`;

	return (
		<a href={instancePath}>
			{ name }
		</a>
	);

};
