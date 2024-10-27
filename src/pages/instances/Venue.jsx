import { App, InstanceFacet, InstanceLink, InstanceLinksList, ProductionsList } from '../../components/index.js';

const Venue = props => {

	const { currentPath, documentTitle, pageTitle, venue } = props;

	const { model, surVenue, subVenues, productions } = venue;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

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

						<InstanceLinksList instances={subVenues} />

					</InstanceFacet>
				)
			}

			{
				productions?.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<ProductionsList productions={productions} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Venue;
