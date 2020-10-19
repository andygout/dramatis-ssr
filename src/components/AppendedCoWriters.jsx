import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const AppendedCoWriters = props => {

	const { coWriters } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;(co-written with&nbsp;</Fragment>

			<CommaSeparatedInstanceLinks instances={coWriters} />

			<Fragment>)</Fragment>

		</Fragment>
	);

};

export default AppendedCoWriters;
