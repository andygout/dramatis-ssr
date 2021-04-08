import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormat, InstanceLink, WritingCredits } from '.';

const WritingEntities = props => {

	const { entities } = props;

	return (
		<Fragment>

			{
				entities
					.map((entity, index) =>
						<Fragment key={index}>

							{
								entity.uuid
									? <InstanceLink instance={entity} />
									: entity.name
							}

							{
								entity.format && (
									<AppendedFormat format={entity.format} />
								)
							}

							{
								entity.writingCredits?.length > 0 && (
									<Fragment>&nbsp;

										<WritingCredits
											writingCredits={entity.writingCredits}
											isAppendage={true}
										/>

									</Fragment>
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</Fragment>
	);

};

export default WritingEntities;
