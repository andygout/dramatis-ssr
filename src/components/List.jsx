import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	AppendedCreativeCrewCredits,
	AppendedDepictions,
	AppendedEntities,
	AppendedFormat,
	AppendedPerformers,
	AppendedRoles,
	AppendedSubTheatres,
	AppendedTheatre,
	AppendedWritingCredits,
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
							instance.uuid
								? <InstanceLink instance={instance} />
								: <Fragment>{ instance.name }</Fragment>
						}

						{
							instance.format && (
								<AppendedFormat format={instance.format} />
							)
						}

						{
							instance.theatre && (
								<AppendedTheatre theatre={instance.theatre} />
							)
						}

						{
							instance.subTheatre && (
								<AppendedTheatre theatre={instance.subTheatre} />
							)
						}

						{
							instance.subTheatres?.length > 0 && (
								<AppendedSubTheatres subTheatres={instance.subTheatres} />
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
							instance.creativeCredits?.length > 0 && (
								<AppendedCreativeCrewCredits credits={instance.creativeCredits} />
							)
						}

						{
							instance.crewCredits?.length > 0 && (
								<AppendedCreativeCrewCredits credits={instance.crewCredits} />
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
