import { Fragment } from 'preact';

import { AppendedFormatAndYear, InstanceLink, PrependedSurInstance, WritingCredits } from './index.js';

const WritingEntities = props => {

	const { entities } = props;

	return (
		<Fragment>

			{
				entities
					.map((entity, index) =>
						<Fragment key={index}>

							{
								entity.surMaterial?.surMaterial && (
									<PrependedSurInstance surInstance={entity.surMaterial.surMaterial} />
								)
							}

							{
								entity.surMaterial && (
									<PrependedSurInstance surInstance={entity.surMaterial} />
								)
							}

							<InstanceLink instance={entity} />

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
					.reduce((accumulator, currentValue, currentIndex) => {

						let separator = ', ';

						if (entities.length === 2) {

							separator = ' and ';

						} else {

							const isFinalIteration = currentIndex === entities.length - 1;

							if (isFinalIteration) separator = ', and ';

						}

						return [accumulator, separator, currentValue];

					})
			}

		</Fragment>
	);

};

export default WritingEntities;
