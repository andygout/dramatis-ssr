import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedVenue, InstanceLink } from '.';

const Productions = props => {

	const { productions } = props;

	return (
		<Fragment>

			{
				productions
					.map((production, index) =>
						<Fragment key={index}>

							<InstanceLink instance={production} />

							{
								production.venue && (
									<AppendedVenue venue={production.venue} />
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</Fragment>
	);

};

export default Productions;