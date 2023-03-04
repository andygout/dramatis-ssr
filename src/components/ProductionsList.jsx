import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { ListWrapper, ProductionLinkWithContext } from '.';

const ProductionsList = props => {

	const { productions, isNested } = props;

	return (
		<ListWrapper isNested={isNested}>

			{
				productions.map((production, index) =>
					<li key={index}>

						<ProductionLinkWithContext production={production} />

						{
							production.subProductions?.length > 0 && (
								<ProductionsList productions={production.subProductions} isNested={true} />
							)
						}

					</li>
				)
			}

		</ListWrapper>
	);

};

export default ProductionsList;
