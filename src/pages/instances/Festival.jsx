import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink, ProductionsList } from '../../components';

const Festival = props => {

	const { currentPath, documentTitle, pageTitle, festival } = props;

	const { model, festivalSeries, productions } = festival;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				festivalSeries && (
					<InstanceFacet labelText='Festival series'>

						<InstanceLink instance={festivalSeries} />

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

export default Festival;
