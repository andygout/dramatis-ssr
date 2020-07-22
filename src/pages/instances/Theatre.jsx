import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, List } from '../../components';

const Theatre = props => {

	const { documentTitle, pageTitle, theatre } = props;

	const { model, productions } = theatre;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

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

export default Theatre;
