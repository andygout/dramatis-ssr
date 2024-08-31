import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { JoinedRoles } from './index.js';

const AppendedRoles = props => {

	const { roles } = props;

	return (
		<Fragment>

			<Fragment>{' … '}</Fragment>

			<JoinedRoles instances={roles} />

		</Fragment>
	);

};

export default AppendedRoles;
