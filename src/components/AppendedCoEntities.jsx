import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { Entities } from './index.js';

const AppendedCoEntities = props => {

	const { coEntities } = props;

	return (
		<Fragment>

			<Fragment>{' (with '}</Fragment>

			<Entities entities={coEntities} />

			<Fragment>{')'}</Fragment>

		</Fragment>
	);

};

export default AppendedCoEntities;
