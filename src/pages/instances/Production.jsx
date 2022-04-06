import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	App,
	AppendedFormatAndYear,
	AppendedWritingCredits,
	Entities,
	InstanceFacet,
	InstanceLink,
	List,
	Materials,
	ProducerCredits,
	Productions
} from '../../components';
import { formatDate } from '../../lib/format-date';

const Production = props => {

	const { documentTitle, pageTitle, production } = props;

	const {
		model,
		material,
		startDate,
		pressDate,
		endDate,
		venue,
		producerCredits,
		cast,
		creativeCredits,
		crewCredits,
		awards
	} = production;

	const dateFormatOptions = { weekday: 'long', month: 'long' };

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

			{
				material && (
					<InstanceFacet labelText='Material'>

						<InstanceLink instance={material} />

							{
								(material.format || material.year) && (
									<AppendedFormatAndYear format={material.format} year={material.year} />
								)
							}

						{
							material.writingCredits?.length > 0 && (
								<AppendedWritingCredits credits={material.writingCredits} />
							)
						}

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

						{
							venue.surVenue && (
								<span><InstanceLink instance={venue.surVenue} />: </span>
							)
						}

						<InstanceLink instance={venue} />

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

			{
				crewCredits?.length > 0 && (
					<InstanceFacet labelText='Crew'>

						<List instances={crewCredits} />

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

									<ul className="list">

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
																					<span>{nomination.type}</span>

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
																						nomination.coProductions.length > 0 && (
																							<Fragment>
																								<Fragment>{' (with '}</Fragment>
																								<Productions
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
																								<Materials
																									materials={nomination.materials}
																								/>
																							</Fragment>
																						)
																					}
																				</Fragment>
																			)
																			.reduce((prev, curr) => [prev, ', ', curr])
																	}
																</Fragment>
															)
															.reduce((prev, curr) => [prev, '; ', curr])
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

export default Production;
