import { h } from 'preact';

import { AppendedPerformers, AppendedRoles, AppendedTheatre, InstanceLink } from '.';

export default function (props) {

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
							instance.roles && instance.roles.length > 0 && (
								<AppendedRoles roles={instance.roles} />
							)
						}

						{
							instance.performers && instance.performers.length > 0 && (
								<AppendedPerformers performers={instance.performers} />
							)
						}

					</li>
				))
			}
		</ul>
	);

};
