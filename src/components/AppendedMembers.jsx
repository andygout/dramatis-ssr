import { Fragment } from 'preact';

import { CommaSeparatedInstanceLinks } from './index.js';

const AppendedMembers = props => {

	const { members } = props;

	return (
		<Fragment>

			<Fragment>{' ('}</Fragment>

			<CommaSeparatedInstanceLinks instances={members} />

			<Fragment>{')'}</Fragment>

		</Fragment>
	);

};

export default AppendedMembers;
