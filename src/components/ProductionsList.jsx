import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { ListWrapper, ProductionLinkWithContext } from '.';

const ProductionsList = props => {

	const { productions } = props;

	return (
		<ListWrapper>

			{
				productions.map((production, index) =>
					<li key={index}>

						<ProductionLinkWithContext production={production} />

					</li>
				)
			}

		</ListWrapper>
	);

};

export default ProductionsList;
