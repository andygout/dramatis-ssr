import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedPerformers, AppendedRoles, AppendedQualifiers, AppendedTheatre, InstanceLink } from '.';

const List = props => {

	const { instances } = props;

	return (
		<ul className="list">
			{
				instances.map((instance, index) => (
					<li key={index}>

						<InstanceLink instance={instance} />

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
							instance.qualifiers?.length > 0 && (
								<AppendedQualifiers qualifiers={instance.qualifiers} />
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
