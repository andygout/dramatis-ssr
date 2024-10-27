import { App, InstanceFacet, InstanceLinksList } from '../../components/index.js';

const Award = props => {

	const { currentPath, documentTitle, pageTitle, award } = props;

	const { model, ceremonies } = award;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				ceremonies?.length > 0 && (
					<InstanceFacet labelText='Ceremonies'>

						<InstanceLinksList instances={ceremonies} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Award;
