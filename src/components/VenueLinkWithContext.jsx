import { Fragment } from 'preact';

import { InstanceLink, PrependedSurInstance } from './index.js';

const VenueLinkWithContext = props => {

	const { venue } = props;

	return (
		<Fragment>

			{
				venue.surVenue && (
					<PrependedSurInstance surInstance={venue.surVenue} />
				)
			}

			<InstanceLink instance={venue} />

		</Fragment>
	);

};

export default VenueLinkWithContext;
