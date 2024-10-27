import { Fragment } from 'preact';

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
