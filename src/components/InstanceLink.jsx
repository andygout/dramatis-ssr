import React from 'react';

import { irregularPluralNounsMap } from '../utils/constants';

export default function (props) {

	const { instance } = props;

	const model = instance.model;

	const instancePath = `/${irregularPluralNounsMap[model] || model + 's'}/${instance.uuid}`;

	return (
		<a href={instancePath}>
			{ instance.name }
		</a>
	);

};
