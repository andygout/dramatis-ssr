import { h } from 'preact'; // eslint-disable-line no-unused-vars

import {
	AppendedDisplayName,
	AppendedGroups,
	AppendedPerformers,
	AppendedRoles,
	AppendedQualifiers,
	AppendedTheatre,
	InstanceLink
} from '.';

const List = props => {

	const { instances } = props;

	return (
		<ul className="list">
			{
				instances.map((instance, index) => (
					<li key={index}>

						{
							instance.uuid
								? <InstanceLink instance={instance} />
								: <span>{ instance.name }</span>
						}

						{
							instance.theatre && (
								<AppendedTheatre theatre={instance.theatre} />
							)
						}

						{
							instance.roles?.length > 0 && (
								<AppendedRoles roles={instance.roles} />
							)
						}

						{
							instance.characterDisplayName && (
								<AppendedDisplayName displayName={instance.characterDisplayName} />
							)
						}

						{
							instance.qualifiers?.length > 0 && (
								<AppendedQualifiers qualifiers={instance.qualifiers} />
							)
						}

						{
							instance.groups?.length > 0 && (
								<AppendedGroups groups={instance.groups} />
							)
						}

						{
							instance.performers?.length > 0 && (
								<AppendedPerformers performers={instance.performers} />
							)
						}

						{
							instance.qualifier && (
								<span> ({instance.qualifier})</span>
							)
						}

					</li>
				))
			}
		</ul>
	);

};

export default List;
