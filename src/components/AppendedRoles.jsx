import { Fragment } from 'preact';

import JoinedRoles from './JoinedRoles.jsx';

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
