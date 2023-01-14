import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	App,
	AppendedFormatAndYear,
	CharactersList,
	CommaSeparatedMaterials,
	CommaSeparatedProductions,
	Entities,
	InstanceFacet,
	InstanceLink,
	ListWrapper,
	MaterialLinkWithContext,
	MaterialsList,
	ProductionsList,
	WritingCredits
} from '../../components';
import { capitalise } from '../../lib/strings';

const Material = props => {

	const { currentPath, documentTitle, pageTitle, material } = props;

	const {
		model,
		format,
		year,
		writingCredits,
		surMaterial,
		subMaterials,
		characterGroups,
		originalVersionMaterial,
		subsequentVersionMaterials,
		productions,
		sourcingMaterials,
		sourcingMaterialProductions,
		awards,
		subsequentVersionMaterialAwards,
		sourcingMaterialAwards
	} = material;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

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

						<WritingCredits credits={writingCredits} isAppendage={false} />

					</InstanceFacet>
				)
			}

			{
				surMaterial && (
					<InstanceFacet labelText='Part of'>

						<MaterialLinkWithContext material={surMaterial} />

					</InstanceFacet>
				)
			}

			{
				subMaterials?.length > 0 && (
					<InstanceFacet labelText='Comprises'>

						<MaterialsList materials={subMaterials} />

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
												<div className="instance-facet-subheader">

													{ characterGroups[0].name }

												</div>
											)
										}

										<CharactersList characters={characterGroups[0].characters} />

									</Fragment>
								)
								: (
									<ul className="list list--no-bullets">

										{
											characterGroups.map((characterGroup, index) =>
												<li key={index} className="instance-facet-group">

													{
														Boolean(characterGroup.name) && (
															<div className="instance-facet-subheader">

																{ characterGroup.name }

															</div>
														)
													}

													<CharactersList characters={characterGroup.characters} />

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

						<MaterialLinkWithContext material={originalVersionMaterial} />

					</InstanceFacet>
				)
			}

			{
				subsequentVersionMaterials?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions'>

						<MaterialsList materials={subsequentVersionMaterials} />

					</InstanceFacet>
				)
			}

			{
				productions?.length > 0 && (
					<InstanceFacet labelText='Productions'>

						<ProductionsList productions={productions} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as source material'>

						<MaterialsList materials={sourcingMaterials} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterialProductions?.length > 0 && (
					<InstanceFacet labelText='Productions of materials as source material'>

						<ProductionsList productions={sourcingMaterialProductions} />

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
																						nomination.productions.length > 0 && (
																							<Fragment>
																								<Fragment>{' for '}</Fragment>
																								<CommaSeparatedProductions
																									productions={nomination.productions}
																								/>
																							</Fragment>
																						)
																					}

																					{
																						nomination.productions.length > 0 &&
																						(nomination.recipientMaterial || nomination.coMaterials.length > 0) && (
																							<Fragment>{';'}</Fragment>
																						)
																					}

																					{
																						nomination.recipientMaterial && (
																							<Fragment>
																								<Fragment>{' (for '}</Fragment>
																								<InstanceLink instance={nomination.recipientMaterial} />
																								{
																									(nomination.recipientMaterial.format || nomination.recipientMaterial.year) && (
																										<AppendedFormatAndYear
																											format={nomination.recipientMaterial.format}
																											year={nomination.recipientMaterial.year}
																										/>
																									)
																								}
																								<Fragment>{')'}</Fragment>
																							</Fragment>
																						)
																					}

																					{
																						nomination.recipientMaterial &&
																						nomination.coMaterials.length > 0 && (
																							<Fragment>{';'}</Fragment>
																						)
																					}

																					{
																						nomination.coMaterials.length > 0 && (
																							<Fragment>
																								<Fragment>{' (with '}</Fragment>
																								<CommaSeparatedMaterials
																									materials={nomination.coMaterials}
																								/>
																								<Fragment>{')'}</Fragment>
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

			{
				subsequentVersionMaterialAwards?.length > 0 && (
					<InstanceFacet labelText='Awards for subsequent versions'>

						{
							subsequentVersionMaterialAwards.map((subsequentVersionMaterialAward, index) =>
								<Fragment key={index}>
									<InstanceLink instance={subsequentVersionMaterialAward} />

									<ListWrapper>

										{
											subsequentVersionMaterialAward.ceremonies.map((ceremony, index) =>
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
																						nomination.subsequentVersionMaterials.length > 0 && (
																							<Fragment>
																								<Fragment>{': '}</Fragment>
																								<CommaSeparatedMaterials
																									materials={nomination.subsequentVersionMaterials}
																								/>
																							</Fragment>
																						)
																					}

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
																						nomination.productions.length > 0 && (
																							<Fragment>
																								<Fragment>{' for '}</Fragment>
																								<CommaSeparatedProductions
																									productions={nomination.productions}
																								/>
																							</Fragment>
																						)
																					}

																					{
																						nomination.productions.length > 0 &&
																						nomination.materials.length > 0 && (
																							<Fragment>{';'}</Fragment>
																						)
																					}

																					{
																						nomination.materials.length > 0 && (
																							<Fragment>
																								<Fragment>{' (with '}</Fragment>
																								<CommaSeparatedMaterials
																									materials={nomination.materials}
																								/>
																								<Fragment>{')'}</Fragment>
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

			{
				sourcingMaterialAwards?.length > 0 && (
					<InstanceFacet labelText='Awards for materials as source material'>

						{
							sourcingMaterialAwards.map((sourcingMaterialAward, index) =>
								<Fragment key={index}>
									<InstanceLink instance={sourcingMaterialAward} />

									<ListWrapper>

										{
											sourcingMaterialAward.ceremonies.map((ceremony, index) =>
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
																						nomination.sourcingMaterials.length > 0 && (
																							<Fragment>
																								<Fragment>{': '}</Fragment>
																								<CommaSeparatedMaterials
																									materials={nomination.sourcingMaterials}
																								/>
																							</Fragment>
																						)
																					}

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
																						nomination.productions.length > 0 && (
																							<Fragment>
																								<Fragment>{' for '}</Fragment>
																								<CommaSeparatedProductions
																									productions={nomination.productions}
																								/>
																							</Fragment>
																						)
																					}

																					{
																						nomination.productions.length > 0 &&
																						nomination.materials.length > 0 && (
																							<Fragment>{';'}</Fragment>
																						)
																					}

																					{
																						nomination.materials.length > 0 && (
																							<Fragment>
																								<Fragment>{' (with '}</Fragment>
																								<CommaSeparatedMaterials
																									materials={nomination.materials}
																								/>
																								<Fragment>{')'}</Fragment>
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

		</App>
	);

};

export default Material;
