import { h } from 'preact';

import { App, InstanceFacet, List } from '../../components';

export default props => {

	const { documentTitle, pageTitle, person } = props;

	const { model, productions } = person;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				productions && productions.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<List instances={productions} />

					</InstanceFacet>
				)
			}

		</App>
	);

};
