import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, List } from '../../components';

const Award = props => {

	const { currentPath, documentTitle, pageTitle, award } = props;

	const { model, ceremonies } = award;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				ceremonies?.length > 0 && (
					<InstanceFacet labelText='Ceremonies'>

						<List instances={ceremonies} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Award;