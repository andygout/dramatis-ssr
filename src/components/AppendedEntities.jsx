import { Fragment } from 'preact';

import Entities from './Entities.jsx';

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
