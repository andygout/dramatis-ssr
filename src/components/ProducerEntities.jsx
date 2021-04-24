import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink, PrependedCreditedMembers } from '.';

const ProducerEntities = props => {

	const { entities } = props;

	return (
		<Fragment>

			{
				entities
					.map((entity, index) =>
						<Fragment key={index}>

							{
								entity.creditedMembers?.length > 0 && (
									<PrependedCreditedMembers creditedMembers={entity.creditedMembers} />
								)
							}

							{
								entity.uuid
									? <InstanceLink instance={entity} />
									: entity.name
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</Fragment>
	);

};

export default ProducerEntities;
