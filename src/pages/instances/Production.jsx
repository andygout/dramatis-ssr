import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedWriters, InstanceFacet, InstanceLink, List } from '../../components';

const Production = props => {

	const { documentTitle, pageTitle, production } = props;

	const { model, theatre, playtext, cast } = production;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				playtext && (
					<InstanceFacet labelText='Playtext'>

						<InstanceLink instance={playtext} />

						{
							playtext.writers?.length > 0 && (
								<AppendedWriters writers={playtext.writers} />
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
