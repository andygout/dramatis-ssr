import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLink, ListWrapper } from '../../components/index.js';

const Venues = props => {

	const { documentTitle, pageTitle, venues } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<ListWrapper>

				{
					venues.map((venue, index) =>
						<li key={index}>

							<InstanceLink instance={venue} />

							{
								venue.subVenues?.length > 0 && (
									<Fragment>

										<Fragment>{': '}</Fragment>

										{
											venue.subVenues
												.map((subVenue, index) =>
													<InstanceLink key={index} instance={subVenue} />
												)
												.reduce((accumulator, currentValue) => [accumulator, ' / ', currentValue])
										}

									</Fragment>
								)
							}

						</li>
					)
				}

			</ListWrapper>

		</App>
	);

};

export default Venues;
