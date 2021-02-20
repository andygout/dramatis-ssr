import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks } from '.';

const AppendedCreativeEntities = props => {

	const { creativeEntities } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;…&nbsp;</Fragment>

			<CommaSeparatedInstanceLinks instances={creativeEntities} />

		</Fragment>
	);

};

export default AppendedCreativeEntities;
