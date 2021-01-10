import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	AppendedDepictions,
	AppendedFormat,
	AppendedPerformers,
	AppendedRoles,
	AppendedSubTheatres,
	AppendedTheatre,
	AppendedWriterGroups,
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
							instance.writerGroups?.length > 0 && (
								<AppendedWriterGroups writerGroups={instance.writerGroups} />
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
