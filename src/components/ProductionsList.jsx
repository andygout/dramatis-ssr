import { ListWrapper, ProductionLinkWithContext } from './index.js';

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
