import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

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
