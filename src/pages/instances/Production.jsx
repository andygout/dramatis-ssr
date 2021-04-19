import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, AppendedFormat, AppendedWritingCredits, InstanceFacet, InstanceLink, List } from '../../components';
import { formatDate } from '../../lib/format-date';

const Production = props => {

	const { documentTitle, pageTitle, production } = props;

	const {
		model,
		material,
		startDate,
		pressDate,
		endDate,
		theatre,
		producerCredits,
		cast,
		creativeCredits,
		crewCredits
	} = production;

	const dateFormatOptions = { weekday: 'long', month: 'long' };

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
							material.writingCredits?.length > 0 && (
								<AppendedWritingCredits writingCredits={material.writingCredits} />
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
									<b>Starts:</b>&nbsp;{ formatDate(startDate, dateFormatOptions) }
								</div>
							)
						}

						{
							pressDate && (
								<div>
									<b>Press:</b>&nbsp;{ formatDate(pressDate, dateFormatOptions) }
								</div>
							)
						}

						{
							endDate && (
								<div>
									<b>Ends:</b>&nbsp;{ formatDate(endDate, dateFormatOptions) }
								</div>
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
				producerCredits?.length > 0 && (
					<InstanceFacet labelText='Producers'>

						<List instances={producerCredits} />

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

		</App>
	);

};

export default Production;
