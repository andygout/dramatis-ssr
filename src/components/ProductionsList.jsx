import ListWrapper from './ListWrapper.jsx';
import ProductionLinkWithContext from './ProductionLinkWithContext.jsx';

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
