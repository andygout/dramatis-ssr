import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink, List } from '../../components';

const Venue = props => {

	let { documentTitle, pageTitle } = props;

	const { venue: { model, surVenue, subVenues, productions } } = props;

	if (surVenue) {

		documentTitle = `${surVenue.name}: ${documentTitle}`;
		pageTitle = `${surVenue.name}: ${pageTitle}`;

	}

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
