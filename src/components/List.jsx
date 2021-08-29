import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	AppendedDepictions,
	AppendedEntities,
	AppendedFormatAndYear,
	AppendedPerformers,
	AppendedProductionDates,
	AppendedProducerCredits,
	AppendedProductionTeamCredits,
	AppendedRoles,
	AppendedSubVenues,
	AppendedVenue,
	AppendedWritingCredits,
	PrependedAward,
	InstanceLink
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
							instance.uuid
								? <InstanceLink instance={instance} />
								: <Fragment>{ instance.name }</Fragment>
						}

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
							instance.startDate && instance.endDate && (
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
								<AppendedWritingCredits writingCredits={instance.writingCredits} />
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
								<Fragment>&nbsp;({instance.qualifier})</Fragment>
							)
						}

					</li>
				)
			}

		</ul>
	);

};

export default List;
