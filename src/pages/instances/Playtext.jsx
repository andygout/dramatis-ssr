import { h } from 'preact';

import { App, InstanceFacet, List } from '../../components';

export default props => {

	const { documentTitle, pageTitle, playtext } = props;

	const { model, productions, characters } = playtext;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				productions?.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<List instances={productions} />

					</InstanceFacet>
				)
			}

			{
				characters?.length > 0 && (
					<InstanceFacet labelText='Characters'>

						<List instances={characters} />

					</InstanceFacet>
				)
			}

		</App>
	);

};
