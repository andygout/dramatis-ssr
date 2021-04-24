import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const PrependedCreditedMembers = props => {

	const { creditedMembers } = props;

	return (
		<Fragment>

			<CommaSeparatedInstanceLinks instances={creditedMembers} />

			<Fragment>&nbsp;for&nbsp;</Fragment>

		</Fragment>
	);

};

export default PrependedCreditedMembers;
