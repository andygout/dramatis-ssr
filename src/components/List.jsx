import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	AppendedDepictions,
	AppendedEntities,
	AppendedFormatAndYear,
	AppendedPerformers,
	AppendedProducerCredits,
	AppendedProductionDates,
	AppendedProductionTeamCredits,
	AppendedRoles,
	AppendedSubVenues,
	AppendedVenue,
	AppendedWritingCredits,
	InstanceLink,
	PrependedAward,
	PrependedSurMaterial
} from '.';

const List = props => {

	const { instances } = props;

	return (
		<ul className="list">

			{
				instances.map((instance, index) =>
					<li key={index}>

						{
							instance.award && (
								<PrependedAward award={instance.award} />
							)
						}

						{
							instance.surMaterial && (
								<PrependedSurMaterial surMaterial={instance.surMaterial} />
							)
						}

						<InstanceLink instance={instance} />

						{
							(instance.format || instance.year) && (
								<AppendedFormatAndYear format={instance.format} year={instance.year} />
							)
						}

						{
							instance.venue && (
								<AppendedVenue venue={instance.venue} />
							)
						}

						{
							instance.subVenue && (
								<AppendedVenue venue={instance.subVenue} />
							)
						}

						{
							instance.subVenues?.length > 0 && (
								<AppendedSubVenues subVenues={instance.subVenues} />
							)
						}

						{
							(instance.startDate || instance.endDate) && (
								<AppendedProductionDates startDate={instance.startDate} endDate={instance.endDate} />
							)
						}

						{
							instance.roles?.length > 0 && (
								<AppendedRoles roles={instance.roles} />
							)
						}

						{
							instance.writingCredits?.length > 0 && (
								<AppendedWritingCredits credits={instance.writingCredits} />
							)
						}

						{
							instance.producerCredits?.length > 0 && (
								<AppendedProducerCredits credits={instance.producerCredits} />
							)
						}

						{
							instance.creativeCredits?.length > 0 && (
								<AppendedProductionTeamCredits credits={instance.creativeCredits} />
							)
						}

						{
							instance.crewCredits?.length > 0 && (
								<AppendedProductionTeamCredits credits={instance.crewCredits} />
							)
						}

						{
							instance.entities?.length > 0 && (
								<AppendedEntities entities={instance.entities} />
							)
						}

						{
							instance.depictions?.length > 0 && (
								<AppendedDepictions depictions={instance.depictions} />
							)
						}

						{
							instance.performers?.length > 0 && (
								<AppendedPerformers performers={instance.performers} />
							)
						}

						{
							instance.qualifier && (
								<Fragment>{` (${instance.qualifier})`}</Fragment>
							)
						}

					</li>
				)
			}

		</ul>
	);

};

export default List;
