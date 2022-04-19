import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormatAndYear, AppendedWritingCredits, InstanceLink, PrependedSurMaterial } from '.';

const Materials = props => {

	const { materials } = props;

	return (
		<Fragment>

			{
				materials
					.map((material, index) =>
						<Fragment key={index}>

							{
								material.surMaterial && (
									<PrependedSurMaterial surMaterial={material.surMaterial} />
								)
							}

							<InstanceLink instance={material} />

							{
								(material.format || material.year) && (
									<AppendedFormatAndYear format={material.format} year={material.year} />
								)
							}

							{
								material.writingCredits?.length > 0 && (
									<AppendedWritingCredits credits={material.writingCredits} />
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</Fragment>
	);

};

export default Materials;
