import { Fragment } from 'preact';

import InstanceLink from './InstanceLink.jsx';
import PrependedSurInstance from './PrependedSurInstance.jsx';

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
