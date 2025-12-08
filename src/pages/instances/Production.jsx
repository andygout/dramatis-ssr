import { Fragment } from 'preact';

import {
	App,
	AppendedDate,
	AppendedRoles,
	CommaSeparatedMaterials,
	CommaSeparatedProductions,
	Entities,
	FestivalLinkWithContext,
	InstanceFacet,
	InstanceLink,
	ListWrapper,
	MaterialLinkWithContext,
	ProducerCredits,
	ProductionTeamCreditsList,
	VenueLinkWithContext
} from '../../components/index.js';
import formatDate from '../../lib/format-date.js';

const Production = props => {

	const { currentPath, documentTitle, pageTitle, pageSubtitle, production } = props;

	const dateFormatOptions = { weekday: 'long', month: 'long' };

	const renderProduction = production => {

		const {
			material,
			startDate,
			pressDate,
			endDate,
			venue,
			season,
			festival,
			surProduction,
			subProductions,
			producerCredits,
			cast,
			creativeCredits,
			crewCredits,
			reviews,
			awards
		} = production;

		return (
			<Fragment>

				{
					material && (
						<InstanceFacet labelText='Material'>

							<MaterialLinkWithContext material={material} />

						</InstanceFacet>
					)
				}

				{
					(startDate || pressDate || endDate) && (
						<InstanceFacet labelText='Dates'>

							{
								startDate && (
									<div>
										<b>Starts:</b>{` ${formatDate(startDate, dateFormatOptions)}`}
									</div>
								)
							}

							{
								pressDate && (
									<div>
										<b>Press:</b>{` ${formatDate(pressDate, dateFormatOptions)}`}
									</div>
								)
							}

							{
								endDate && (
									<div>
										<b>Ends:</b>{` ${formatDate(endDate, dateFormatOptions)}`}
									</div>
								)
							}

						</InstanceFacet>
					)
				}

				{
					venue && (
						<InstanceFacet labelText='Venue'>

							<VenueLinkWithContext venue={venue} />

						</InstanceFacet>
					)
				}

				{
					season && (
						<InstanceFacet labelText='Season'>

							<InstanceLink instance={season} />

						</InstanceFacet>
					)
				}

				{
					festival && (
						<InstanceFacet labelText='Festival'>

							<FestivalLinkWithContext festival={festival} />

						</InstanceFacet>
					)
				}

				{
					surProduction && (
						<InstanceFacet labelText='Part of'>

							<div className="nested-instance">

								<InstanceFacet labelText='Production'>

									<InstanceLink instance={surProduction} />

									{
										surProduction.subtitle && (
											<p>{ surProduction.subtitle }</p>
										)
									}

								</InstanceFacet>

								{
									renderProduction(surProduction)
								}

							</div>

						</InstanceFacet>
					)
				}

				{
					subProductions?.length > 0 && (
						<InstanceFacet labelText='Comprises'>

						{
							subProductions
								.map((subProduction, index) =>
									<div key={index} className="nested-instance">

										<InstanceFacet labelText='Production'>

											<InstanceLink instance={subProduction} />

											{
												subProduction.subtitle && (
													<p>{ subProduction.subtitle }</p>
												)
											}

										</InstanceFacet>

										{
											renderProduction(subProduction)
										}

									</div>
								)
						}

						</InstanceFacet>
					)
				}

				{
					producerCredits?.length > 0 && (
						<InstanceFacet labelText='Producers'>

							<ProducerCredits credits={producerCredits} />

						</InstanceFacet>
					)
				}

				{
					cast?.length > 0 && (
						<InstanceFacet labelText='Cast'>

							<ListWrapper>

								{
									cast.map((castMember, index) =>
										<li key={index}>

											<InstanceLink instance={castMember} />

											{
												castMember.roles?.length > 0 && (
													<AppendedRoles roles={castMember.roles} />
												)
											}

										</li>
									)
								}

							</ListWrapper>

						</InstanceFacet>
					)
				}

				{
					creativeCredits?.length > 0 && (
						<InstanceFacet labelText='Creative Team'>

							<ProductionTeamCreditsList credits={creativeCredits} />

						</InstanceFacet>
					)
				}

				{
					crewCredits?.length > 0 && (
						<InstanceFacet labelText='Crew'>

							<ProductionTeamCreditsList credits={crewCredits} />

						</InstanceFacet>
					)
				}

				{
					reviews?.length > 0 && (
						<InstanceFacet labelText='Reviews'>

							<ListWrapper>

								{
									reviews.map((review, index) =>
										<li key={index}>

											<InstanceLink instance={review.critic} />

											{', '}

											<InstanceLink instance={review.publication} />

											{
												(review.date) && (
													<AppendedDate date={review.date} />
												)
											}

											{': '}

											<a
												href={review.url}
												target="_blank"
												rel="noopener noreferrer"
											>{'link'}</a>

										</li>
									)
								}

							</ListWrapper>

						</InstanceFacet>
					)
				}

				{
					awards?.length > 0 && (
						<InstanceFacet labelText='Awards'>

							{
								awards.map((award, index) =>
									<Fragment key={index}>
										<InstanceLink instance={award} />

										<ListWrapper>

											{
												award.ceremonies.map((ceremony, index) =>
													<li key={index}>
														<InstanceLink instance={ceremony} />{': '}

														{
															ceremony.categories
																.map((category, index) =>
																	<Fragment key={index}>
																		{ category.name }{': '}

																		{
																			category.nominations
																				.map((nomination, index) =>
																					<Fragment key={index}>
																						<span className={nomination.isWinner ? 'nomination-winner-text' : ''}>
																							{nomination.type}
																						</span>

																						{
																							nomination.entities.length > 0 && (
																								<Fragment>
																									<Fragment>{': '}</Fragment>
																									<Entities
																										entities={nomination.entities}
																									/>
																								</Fragment>
																							)
																						}

																						{
																							nomination.entities.length > 0 &&
																							(nomination.recipientProductions.length > 0 || nomination.coProductions.length > 0) && (
																								<Fragment>{';'}</Fragment>
																							)
																						}

																						{
																							nomination.recipientProductions.length > 0 && (
																								<Fragment>
																									<Fragment>{' (for '}</Fragment>
																									<CommaSeparatedProductions
																										productions={nomination.recipientProductions}
																									/>
																									<Fragment>{')'}</Fragment>
																								</Fragment>
																							)
																						}

																						{
																							nomination.recipientProductions.length > 0 &&
																							nomination.coProductions.length > 0 && (
																								<Fragment>{';'}</Fragment>
																							)
																						}

																						{
																							nomination.coProductions.length > 0 && (
																								<Fragment>
																									<Fragment>{' (with '}</Fragment>
																									<CommaSeparatedProductions
																										productions={nomination.coProductions}
																									/>
																									<Fragment>{')'}</Fragment>
																								</Fragment>
																							)
																						}

																						{
																							nomination.coProductions.length > 0 &&
																							nomination.materials.length > 0 && (
																								<Fragment>{';'}</Fragment>
																							)
																						}

																						{
																							nomination.materials.length > 0 && (
																								<Fragment>
																									<Fragment>{' for '}</Fragment>
																									<CommaSeparatedMaterials
																										materials={nomination.materials}
																									/>
																								</Fragment>
																							)
																						}
																					</Fragment>
																				)
																				.reduce((accumulator, currentValue) => [accumulator, ', ', currentValue])
																		}
																	</Fragment>
																)
																.reduce((accumulator, currentValue) => [accumulator, '; ', currentValue])
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

			</Fragment>
		);

	};

	return (
		<App
			currentPath={currentPath}
			documentTitle={documentTitle}
			pageTitle={pageTitle}
			pageSubtitle={pageSubtitle}
			model={production.model}
		>

			{
				renderProduction(production)
			}

		</App>
	);

};

export default Production;
