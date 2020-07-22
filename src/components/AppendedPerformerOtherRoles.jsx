import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { JoinedRoles } from '.';

const AppendedPerformerOtherRoles = props => {

	const { otherRoles } = props;

	return (
		<Fragment>

			<span>; also performed:&nbsp;</span>

			<JoinedRoles instances={otherRoles} />

		</Fragment>
	);

};

export default AppendedPerformerOtherRoles;
