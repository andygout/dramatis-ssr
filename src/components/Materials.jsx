import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedFormatAndYear, InstanceLink } from '.';

const Materials = props => {

	const { materials } = props;

	return (
		<Fragment>

			{
				materials
					.map((material, index) =>
						<Fragment key={index}>

							<InstanceLink instance={material} />

							{
								(material.format || material.year) && (
									<AppendedFormatAndYear format={material.format} year={material.year} />
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
