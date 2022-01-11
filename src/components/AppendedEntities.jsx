import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { Entities } from '.';

const AppendedEntities = props => {

	const { entities } = props;

	return (
		<Fragment>

			<Fragment>{' … '}</Fragment>

			<Entities entities={entities} />

		</Fragment>
	);

};

export default AppendedEntities;
