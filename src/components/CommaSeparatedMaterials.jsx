import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { MaterialLinkWithContext } from '.';

const CommaSeparatedMaterials = props => {

	const { materials } = props;

	return (
		<Fragment>

			{
				materials
					.map((material, index) =>
						<Fragment key={index}>

							<MaterialLinkWithContext material={material} />

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, ', ', currentValue])
			}

		</Fragment>
	);

};

export default CommaSeparatedMaterials;
