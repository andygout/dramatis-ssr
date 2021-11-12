import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const AppendedMembers = props => {

	const { members } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(</Fragment>

			<CommaSeparatedInstanceLinks instances={members} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedMembers;
