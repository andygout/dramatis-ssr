import { h } from 'preact';

import { App, InstanceFacet, JoinedRoles, List } from '../../components';

export default function (props) {

	const { documentTitle, pageTitle, character } = props;

	const { model, playtexts, variantNames, productions } = character;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				playtexts && playtexts.length > 0 && (
					<InstanceFacet labelText='Playtexts'>

						<List instances={playtexts} />

					</InstanceFacet>
				)
			}

			{
				variantNames && variantNames.length > 0 && (
					<InstanceFacet labelText='Variant names'>

						<JoinedRoles instances={variantNames} />

					</InstanceFacet>
				)
			}

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
