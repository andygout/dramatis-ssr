import React from 'react';

import { InstanceLink } from '.';

export default function (props) {

	const { theatre } = props;

	return (
		<React.Fragment>

			<span>&nbsp;-&nbsp;</span>

			<InstanceLink instance={theatre} />

		</React.Fragment>
	);

};
