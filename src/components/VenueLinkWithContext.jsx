import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, PrependedSurInstance } from '.';

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
