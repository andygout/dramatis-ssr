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
	Productions,
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

	const instanceFacetSubheader = subheaderText =>
		<div className="instance-facet-subheader">{ subheaderText }</div>;

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

						<InstanceLink instance={surMaterial} />

						{
							(surMaterial.format || surMaterial.year) && (
								<AppendedFormatAndYear
									format={surMaterial.format}
									year={surMaterial.year}
								/>
							)
						}

						{
							surMaterial.writingCredits?.length > 0 && (
								<AppendedWritingCredits credits={surMaterial.writingCredits} />
							)
						}

					</InstanceFacet>
				)
			}

			{
				subMaterials?.length > 0 && (
					<InstanceFacet labelText='Comprises'>

						<List instances={subMaterials} />

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
														Boolean(characterGroup.name) && (
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
				originalVersionMaterial && (
					<InstanceFacet labelText='Original version'>

						<InstanceLink instance={originalVersionMaterial} />

						{
							(originalVersionMaterial.format || originalVersionMaterial.year) && (
								<AppendedFormatAndYear
									format={originalVersionMaterial.format}
									year={originalVersionMaterial.year}
								/>
							)
						}

						{
							originalVersionMaterial.writingCredits?.length > 0 && (
								<AppendedWritingCredits credits={originalVersionMaterial.writingCredits} />
							)
						}

					</InstanceFacet>
				)
			}

			{
				subsequentVersionMaterials?.length > 0 && (
					<InstanceFacet labelText='Subsequent versions'>

						<List instances={subsequentVersionMaterials} />

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
				sourcingMaterials?.length > 0 && (
					<InstanceFacet labelText='Materials as source material'>

						<List instances={sourcingMaterials} />

					</InstanceFacet>
				)
			}

			{
				sourcingMaterialProductions?.length > 0 && (
					<InstanceFacet labelText='Productions of materials as source material'>

						<List instances={sourcingMaterialProductions} />

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
																								<Productions
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
																								<Materials
																									materials={nomination.coMaterials}
																								/>
																								<Fragment>{')'}</Fragment>
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

			{
				subsequentVersionMaterialAwards?.length > 0 && (
					<InstanceFacet labelText='Awards for subsequent versions'>

						{
							subsequentVersionMaterialAwards.map((subsequentVersionMaterialAward, index) =>
								<Fragment key={index}>
									<InstanceLink instance={subsequentVersionMaterialAward} />

									<ul className="list">

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
																								<Materials
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
																								<Productions
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
																								<Materials
																									materials={nomination.materials}
																								/>
																								<Fragment>{')'}</Fragment>
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

			{
				sourcingMaterialAwards?.length > 0 && (
					<InstanceFacet labelText='Awards for materials as source material'>

						{
							sourcingMaterialAwards.map((sourcingMaterialAward, index) =>
								<Fragment key={index}>
									<InstanceLink instance={sourcingMaterialAward} />

									<ul className="list">

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
																								<Materials
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
																								<Productions
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
																								<Materials
																									materials={nomination.materials}
																								/>
																								<Fragment>{')'}</Fragment>
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

export default Material;
