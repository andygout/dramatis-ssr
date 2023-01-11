import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { ListWrapper, MaterialLinkWithContext } from '.';

const MaterialsList = props => {

	const { materials } = props;

	return (
		<ListWrapper>

			{
				materials.map((material, index) =>
					<li key={index}>

						<MaterialLinkWithContext material={material} />

					</li>
				)
			}

		</ListWrapper>
	);

};

export default MaterialsList;
