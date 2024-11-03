import { Fragment } from 'preact';

import Entities from './Entities.jsx';

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
