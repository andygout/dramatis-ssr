import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { CommaSeparatedInstanceLinks, InstanceLink } from './index.js';

const ProducerEntities = props => {

	const { entities } = props;

	return (
		<Fragment>

			{
				entities
					.map((entity, index) =>
						<Fragment key={index}>

							{
								entity.members?.length > 0 && (
									<Fragment>

										<CommaSeparatedInstanceLinks instances={entity.members} />

										<Fragment>{' for '}</Fragment>

									</Fragment>
								)
							}

							<InstanceLink instance={entity} />

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, ', ', currentValue])
			}

		</Fragment>
	);

};

export default ProducerEntities;
