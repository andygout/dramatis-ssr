import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormatAndYear, InstanceLink, WritingCredits } from '.';

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
								(entity.format || entity.year) && (
									<AppendedFormatAndYear format={entity.format} year={entity.year} />
								)
							}

							{
								entity.writingCredits?.length > 0 && (
									<Fragment>

										<Fragment>{' '}</Fragment>

										<WritingCredits credits={entity.writingCredits} isAppendage={true} />

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
