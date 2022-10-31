import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceFacet, List } from '../../components';

const Character = props => {

	const { currentPath, documentTitle, pageTitle, character } = props;

	const { model, variantNamedDepictions, materials, variantNamedPortrayals, productions } = character;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				variantNamedDepictions?.length > 0 && (
					<InstanceFacet labelText='Variant named depictions'>

						<span className="fictional-name-text">

							{ variantNamedDepictions.join(' / ') }

						</span>

					</InstanceFacet>
				)
			}

			{
				materials?.length > 0 && (
					<InstanceFacet labelText='Materials'>

						<List instances={materials} />

					</InstanceFacet>
				)
			}

			{
				variantNamedPortrayals?.length > 0 && (
					<InstanceFacet labelText='Variant named portrayals'>

						<span className="fictional-name-text">

							{ variantNamedPortrayals.join(' / ') }

						</span>

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

export default Character;
