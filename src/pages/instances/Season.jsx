import { App, InstanceFacet, ProductionsList } from '../../components/index.js';

const Season = props => {

	const { currentPath, documentTitle, pageTitle, season } = props;

	const { model, productions } = season;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

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

export default Season;
