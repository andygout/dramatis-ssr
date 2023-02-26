import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { ListWrapper, MaterialLinkWithContext } from '.';

const MaterialsList = props => {

	const { materials, isNested } = props;

	return (
		<ListWrapper isNested={isNested}>

			{
				materials.map((material, index) =>
					<li key={index}>

						<MaterialLinkWithContext material={material} />

						{
							material.subMaterials?.length > 0 && (
								<MaterialsList materials={material.subMaterials} isNested={true} />
							)
						}

					</li>
				)
			}

		</ListWrapper>
	);

};

export default MaterialsList;
