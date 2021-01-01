import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedFormat, AppendedWriterGroups, InstanceFacet, InstanceLink, List } from '../../components';

const Production = props => {

	const { documentTitle, pageTitle, production } = props;

	const { model, theatre, material, cast } = production;

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
							material.writerGroups?.length > 0 && (
								<AppendedWriterGroups writerGroups={material.writerGroups} />
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

		</App>
	);

};

export default Production;
