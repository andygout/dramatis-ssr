import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, Entities, InstanceFacet, InstanceLink, Materials, Productions } from '../../components';

const AwardCeremony = props => {

	const { documentTitle, pageTitle, awardCeremony } = props;

	const { model, award, categories } = awardCeremony;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				award && (
					<InstanceFacet labelText='Award'>

						<InstanceLink instance={award} />

					</InstanceFacet>
				)
			}

			{
				categories?.length > 0 && (
					<InstanceFacet labelText='Categories'>

						{
							categories.map((category, index) =>
								<Fragment key={index}>
									{ category.name }

									<ul className="list">

										{
											category.nominations.map((nomination, index) =>
												<li key={index}>
													{
														nomination.customType
															? (<span>{`${nomination.customType}: `}</span>)
															: nomination.isWinner
																? (<span>{'Winner: '}</span>)
																: (<span>{'Nomination: '}</span>)
													}

													{
														nomination.entities.length > 0 && (
															<Entities entities={nomination.entities} />
														)
													}

													{
														nomination.entities.length > 0 &&
														(
															nomination.productions.length > 0 ||
															nomination.materials.length > 0
														) && (
															<Fragment>{' for '}</Fragment>
														)
													}

													{
														nomination.productions.length > 0 && (
															<Productions productions={nomination.productions} />
														)
													}

													{
														nomination.productions.length > 0 &&
														nomination.materials.length > 0 && (
															<Fragment>{'; '}</Fragment>
														)
													}

													{
														nomination.materials.length > 0 && (
															<Materials materials={nomination.materials} />
														)
													}
												</li>
											)
										}

									</ul>
								</Fragment>
							)
						}

					</InstanceFacet>
				)
			}

		</App>
	);

};

export default AwardCeremony;
