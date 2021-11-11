import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedNominatedMembers, InstanceLink } from '.';

const NominatedEntities = props => {

	const { nominatedEntities } = props;

	return (
		<Fragment>

			{
				nominatedEntities
					.map((nominatedEntity, index) =>
						<Fragment key={index}>

							<InstanceLink instance={nominatedEntity} />

							{
								nominatedEntity.nominatedMembers?.length > 0 && (
									<AppendedNominatedMembers nominatedMembers={nominatedEntity.nominatedMembers} />
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</Fragment>
	);

};

export default NominatedEntities;
