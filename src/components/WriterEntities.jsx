import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormat, InstanceLink, WriterGroups } from '.';

const WriterEntities = props => {

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
								entity.sourceMaterialWriterGroups?.length > 0 && (
									<Fragment>&nbsp;

										<WriterGroups
											writerGroups={entity.sourceMaterialWriterGroups}
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

export default WriterEntities;
