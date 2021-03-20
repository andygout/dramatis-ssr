import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedCreditedMembers, InstanceLink } from '.';

const CreditedEntities = props => {

	const { creditedEntities } = props;

	return (
		<Fragment>

			{
				creditedEntities
					.map((creditedEntity, index) =>
						<Fragment key={index}>

							<InstanceLink instance={creditedEntity} />

							{
								creditedEntity.creditedMembers?.length > 0 && (
									<AppendedCreditedMembers creditedMembers={creditedEntity.creditedMembers} />
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</Fragment>
	);

};

export default CreditedEntities;
