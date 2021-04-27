import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const AppendedVenue = props => {

	const { venue } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;-&nbsp;</Fragment>

			{
				venue.surVenue && (
					<Fragment><InstanceLink instance={venue.surVenue} />:&nbsp;</Fragment>
				)
			}

			<InstanceLink instance={venue} />

		</Fragment>
	);

};

export default AppendedVenue;
