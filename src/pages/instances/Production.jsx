import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedFormat, AppendedWritingCredits, InstanceFacet, InstanceLink, List } from '../../components';

const Production = props => {

	const { documentTitle, pageTitle, production } = props;

	const { model, theatre, material, cast, creativeCredits } = production;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				material && (
					<InstanceFacet labelText='Material'>

						<InstanceLink instance={material} />

							{
								material.format && (
									<AppendedFormat format={material.format} />
								)
							}

						{
							material.writingCredits?.length > 0 && (
								<AppendedWritingCredits writingCredits={material.writingCredits} />
							)
						}

					</InstanceFacet>
				)
			}

			{
				theatre && (
					<InstanceFacet labelText='Theatre'>

						{
							theatre.surTheatre && (
								<span><InstanceLink instance={theatre.surTheatre} />: </span>
							)
						}

						<InstanceLink instance={theatre} />

					</InstanceFacet>
				)
			}

			{
				cast?.length > 0 && (
					<InstanceFacet labelText='Cast'>

						<List instances={cast} />

					</InstanceFacet>
				)
			}

			{
				creativeCredits?.length > 0 && (
					<InstanceFacet labelText='Creative Team'>

						<List instances={creativeCredits} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Production;
