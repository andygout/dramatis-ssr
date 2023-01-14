import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedMembers, InstanceLink } from '.';

const Entities = props => {

	const { entities } = props;

	return (
		<Fragment>

			{
				entities
					.map((entity, index) =>
						<Fragment key={index}>

							<InstanceLink instance={entity} />

							{
								entity.members?.length > 0 && (
									<AppendedMembers members={entity.members} />
								)
							}

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, ', ', currentValue])
			}

		</Fragment>
	);

};

export default Entities;
