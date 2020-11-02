import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, CommaSeparatedInstanceLinks, InstanceFacet, List } from '../../components';

const Playtext = props => {

	const { documentTitle, pageTitle, playtext } = props;

	const { model, writers, productions, characterGroups } = playtext;

	const instanceFacetSubheader = subheaderText =>
		<div className="instance-facet-subheader">{ subheaderText }</div>;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				writers?.length > 0 && (
					<InstanceFacet labelText='Writers'>

						<CommaSeparatedInstanceLinks instances={writers} />

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
											characterGroups.map((characterGroup, index) => (
												<li key={index} className="instance-facet-group">

													{
														!!characterGroup.name && (
															instanceFacetSubheader(characterGroup.name)
														)
													}

													<List instances={characterGroup.characters} />

												</li>
											))
										}

									</ul>
								)
						}

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

export default Playtext;
