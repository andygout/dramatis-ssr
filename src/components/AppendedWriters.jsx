import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const AppendedWriters = props => {

	const { writers } = props;

	return (
		<Fragment>

			<span>&nbsp;by&nbsp;</span>

			<CommaSeparatedInstanceLinks instances={writers} />

		</Fragment>
	);

};

export default AppendedWriters;
