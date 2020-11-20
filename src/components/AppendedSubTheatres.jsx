import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const AppendedSubTheatres = props => {

	const { subTheatres } = props;

	return (
		<Fragment>

			<Fragment>:&nbsp;</Fragment>

			{
				subTheatres
					.map((subTheatre, index) =>
						<InstanceLink key={index} instance={subTheatre} />
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}

		</Fragment>
	);

};

export default AppendedSubTheatres;
