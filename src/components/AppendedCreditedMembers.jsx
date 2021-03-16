import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const AppendedCreditedMembers = props => {

	const { creditedMembers } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(</Fragment>

			<CommaSeparatedInstanceLinks instances={creditedMembers} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedCreditedMembers;
