import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const JoinedRoles = props => {

	const { instances } = props;

	return (
		<span className="role-text">
			{
				instances
					.map((instance, index) =>
						<span key={index}>
							{
								instance.uuid
									? <InstanceLink instance={instance} />
									: instance.name || instance
							}
							{
								instance.qualifier && (
									<span> ({ instance.qualifier })</span>
								)
							}
						</span>
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}
		</span>
	);

};

export default JoinedRoles;
