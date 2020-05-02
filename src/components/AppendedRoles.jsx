import React from 'react';

import { JoinedRoles } from '.';

export default function (props) {

	const { roles } = props;

	return (
		<React.Fragment>

			<span>&nbsp;…&nbsp;</span>

			<JoinedRoles instances={roles} />

		</React.Fragment>
	);

};
