import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const AppendedNominatedMembers = props => {

	const { nominatedMembers } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(</Fragment>

			<CommaSeparatedInstanceLinks instances={nominatedMembers} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedNominatedMembers;
