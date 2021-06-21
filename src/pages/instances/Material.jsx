import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	App,
	AppendedFormatAndYear,
	AppendedWritingCredits,
	InstanceFacet,
	InstanceLink,
	List,
	WritingCredits
} from '../../components';
import { capitalise } from '../../lib/strings';

const Material = props => {

	const { documentTitle, pageTitle, material } = props;

	const {
		model,
		format,
		year,
		writingCredits,
		characterGroups,
		originalVersionMaterial,
		subsequentVersionMaterials,
		productions,
		sourcingMaterials,
		sourcingMaterialProductions
	} = material;

	const instanceFacetSubheader = subheaderText =>
		<div className="instance-facet-subheader">{ subheaderText }</div>;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				format && (
					<InstanceFacet labelText='Format'>

						<Fragment>{ capitalise(format) }</Fragment>

					</InstanceFacet>
				)
			}

			{
				year && (
					<InstanceFacet labelText='Year'>

						<Fragment>{ year }</Fragment>

					</InstanceFacet>
				)
			}

			{
				writingCredits?.length > 0 && (
					<InstanceFacet labelText='Writers'>

						<WritingCredits writingCredits={writingCredits} isAppendage={false} />

					</InstanceFacet>
				)
			}

			{
				characterGroups?.length > 0 && (
					<InstanceFacet labelText='Characters'>

						{
							characterGroups.length === 1
								? (
									<Fragment>

										{
											Boolean(characterGroups[0].name) && (
												instanceFacetSubheader(characterGroups[0].name)
											)
										}

										<List instances={characterGroups[0].characters} />

									</Fragment>
								)
								: (
									<ul className="list list--no-bullets">

										{
											characterGroups.map((characterGroup, index) =>
												<li key={index} className="instance-facet-group">

													{
														Boolean(characterGroup.name) && (
															instanceFacetSubheader(characterGroup.name)
														)
													}

													<List instances={characterGroup.characters} />

												</li>
											)
										}

									</ul>
								)
						}

					</InstanceFacet>
				)
			}

			{
				originalVersionMaterial && (
					<InstanceFacet labelText='Original version'>

						<InstanceLink instance={originalVersionMaterial} />

						{
							(originalVersionMaterial.format || originalVersionMaterial.year) && (
								<AppendedFormatAndYear
									format={originalVersionMaterial.format}
									year={originalVersionMaterial.year}
								/>
							)
						}

						{
							originalVersionMaterial.writingCredits?.length > 0 && (
								<AppendedWritingCredits writingCredits={originalVersionMaterial.writingCredits} />
							)
						}

					</InstanceFacet>
				)
			}

			{
				subsequentVersionMaterials?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions'>

						<List instances={subsequentVersionMaterials} />

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

			{
				sourcingMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as source material'>

						<List instances={sourcingMaterials} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterialProductions?.length > 0 && (
					<InstanceFacet labelText='Productions of materials as source material'>

						<List instances={sourcingMaterialProductions} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Material;
