import { h } from 'preact';

import { App, InstanceFacet, List } from '../../components';

export default function (props) {

	const { documentTitle, pageTitle, theatre } = props;

	const { model, productions } = theatre;

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
