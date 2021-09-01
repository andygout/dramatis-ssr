import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink, List } from '../../components';

const Venue = props => {

	const { documentTitle, pageTitle, venue } = props;

	const { model, surVenue, subVenues, productions } = venue;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				surVenue && (
					<InstanceFacet labelText='Part of'>

						<InstanceLink instance={surVenue} />

					</InstanceFacet>
				)
			}

			{
				subVenues?.length > 0 && (
					<InstanceFacet labelText='Comprises'>

						<List instances={subVenues} />

					</InstanceFacet>
				)
			}

			{
				productions?.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<List instances={productions} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Venue;
