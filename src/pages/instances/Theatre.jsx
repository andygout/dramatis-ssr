import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, InstanceLink, List } from '../../components';

const Theatre = props => {

	let { documentTitle, pageTitle } = props;

	const { theatre: { model, surTheatre, subTheatres, productions } } = props;

	if (surTheatre) {

		documentTitle = `${surTheatre.name}: ${documentTitle}`;
		pageTitle = `${surTheatre.name}: ${pageTitle}`;

	}

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				surTheatre && (
					<InstanceFacet labelText='Part of'>

						<InstanceLink instance={surTheatre} />

					</InstanceFacet>
				)
			}

			{
				subTheatres?.length > 0 && (
					<InstanceFacet labelText='Comprises'>

						<List instances={subTheatres} />

					</InstanceFacet>
				)
			}

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
