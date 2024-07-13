import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLinksList } from '../../components/index.js';

const FestivalSeries = props => {

	const { currentPath, documentTitle, pageTitle, festivalSeries } = props;

	const { model, festivals } = festivalSeries;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				festivals?.length > 0 && (
					<InstanceFacet labelText='Comprises'>

						<InstanceLinksList instances={festivals} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default FestivalSeries;
