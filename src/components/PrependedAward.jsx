import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const PrependedAward = props => {

	const { award } = props;

	return (
		<Fragment>

			<InstanceLink instance={award} />

			<Fragment>{': '}</Fragment>

		</Fragment>
	);

};

export default PrependedAward;
