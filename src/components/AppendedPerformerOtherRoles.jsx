import { Fragment, h } from 'preact';

import { JoinedRoles } from '.';

export default function (props) {

	const { otherRoles } = props;

	return (
		<Fragment>

			<span>; also performed:&nbsp;</span>

			<JoinedRoles instances={otherRoles} />

		</Fragment>
	);

};
