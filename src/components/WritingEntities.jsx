import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormat, InstanceLink, WritingCredits } from '.';

const WritingEntities = props => {

	const { writingEntities } = props;

	return (
		<Fragment>

			{
				writingEntities
					.map((writingEntity, index) =>
						<Fragment key={index}>

							{
								writingEntity.uuid
									? <InstanceLink instance={writingEntity} />
									: writingEntity.name
							}

							{
								writingEntity.format && (
									<AppendedFormat format={writingEntity.format} />
								)
							}

							{
								writingEntity.sourceMaterialWritingCredits?.length > 0 && (
									<Fragment>&nbsp;

										<WritingCredits
											writingCredits={writingEntity.sourceMaterialWritingCredits}
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
