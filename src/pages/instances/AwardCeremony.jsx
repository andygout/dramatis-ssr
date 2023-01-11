import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	App,
	CommaSeparatedMaterials,
	CommaSeparatedProductions,
	Entities,
	InstanceFacet,
	InstanceLink,
	ListWrapper
} from '../../components';

const AwardCeremony = props => {

	const { currentPath, documentTitle, pageTitle, awardCeremony } = props;

	const { model, award, categories } = awardCeremony;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

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

									<ListWrapper>

										{
											category.nominations.map((nomination, index) =>
												<li key={index}>
													<span className={nomination.isWinner ? 'nomination-winner-text' : ''}>
														{`${nomination.type}: `}
													</span>

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
															<CommaSeparatedProductions
																productions={nomination.productions}
															/>
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
															<CommaSeparatedMaterials materials={nomination.materials} />
														)
													}
												</li>
											)
										}

									</ListWrapper>
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
