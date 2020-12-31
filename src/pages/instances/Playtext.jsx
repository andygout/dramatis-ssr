import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedWriterGroups, InstanceFacet, InstanceLink, List, WriterGroups } from '../../components';

const Playtext = props => {

	const { documentTitle, pageTitle, playtext } = props;

	const {
		model,
		writerGroups,
		characterGroups,
		originalVersionPlaytext,
		subsequentVersionPlaytexts,
		productions,
		sourcingPlaytexts,
		sourcingPlaytextProductions
	} = playtext;

	const instanceFacetSubheader = subheaderText =>
		<div className="instance-facet-subheader">{ subheaderText }</div>;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				writerGroups?.length > 0 && (
					<InstanceFacet labelText='Writers'>

						<WriterGroups writerGroups={writerGroups} isAppendage={false} />

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
											!!characterGroups[0].name && (
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
														!!characterGroup.name && (
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
				originalVersionPlaytext && (
					<InstanceFacet labelText='Original version'>

						<InstanceLink instance={originalVersionPlaytext} />

						{
							originalVersionPlaytext.writerGroups?.length > 0 && (
								<AppendedWriterGroups writerGroups={originalVersionPlaytext.writerGroups} />
							)
						}

					</InstanceFacet>
				)
			}

			{
				subsequentVersionPlaytexts?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions'>

						<List instances={subsequentVersionPlaytexts} />

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
				sourcingPlaytexts?.length > 0 && (
					<InstanceFacet labelText='Playtexts as source material'>

						<List instances={sourcingPlaytexts} />

					</InstanceFacet>
				)
			}

			{
				sourcingPlaytextProductions?.length > 0 && (
					<InstanceFacet labelText='Productions of playtexts as source material'>

						<List instances={sourcingPlaytextProductions} />

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default Playtext;
