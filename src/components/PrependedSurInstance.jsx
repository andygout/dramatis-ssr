import { Fragment } from 'preact';

import { InstanceLink } from './index.js';

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
