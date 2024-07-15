import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { VenueLinkWithContext } from './index.js';

const AppendedVenue = props => {

	const { venue } = props;

	return (
		<Fragment>

			<Fragment>{' — '}</Fragment>

			<VenueLinkWithContext venue={venue} />

		</Fragment>
	);

};

export default AppendedVenue;
