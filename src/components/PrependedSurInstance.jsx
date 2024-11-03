import { Fragment } from 'preact';

import InstanceLink from './InstanceLink.jsx';

const PrependedSurInstance = props => {

	const { surInstance } = props;

	return (
		<Fragment>

			<InstanceLink instance={surInstance} />

			<Fragment>{': '}</Fragment>

		</Fragment>
	);

};

export default PrependedSurInstance;
