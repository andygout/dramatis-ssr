import { Fragment, h } from 'preact';

import { JoinedRoles } from '.';

export default props => {

	const { roles } = props;

	return (
		<Fragment>

			<span>&nbsp;…&nbsp;</span>

			<JoinedRoles instances={roles} />

		</Fragment>
	);

};
