import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const AppendedSubVenues = props => {

	const { subVenues } = props;

	return (
		<Fragment>

			<Fragment>{': '}</Fragment>

			{
				subVenues
					.map((subVenue, index) =>
						<InstanceLink key={index} instance={subVenue} />
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}

		</Fragment>
	);

};

export default AppendedSubVenues;
