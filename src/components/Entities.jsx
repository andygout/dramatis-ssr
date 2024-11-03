import { Fragment } from 'preact';

import AppendedMembers from './AppendedMembers.jsx';
import InstanceLink from './InstanceLink.jsx';

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
