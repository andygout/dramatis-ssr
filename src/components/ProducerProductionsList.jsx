import { Fragment } from 'preact';

import ProducerCredits from './ProducerCredits.jsx';
import ProductionLinkWithContext from './ProductionLinkWithContext.jsx';
import ListWrapper from './ListWrapper.jsx';

const ProducerProductionsList = props => {

	const { productions } = props;

	return (
		<ListWrapper>

			{
				productions.map((production, index) =>
					<li key={index}>

						<ProductionLinkWithContext production={production} />

						{
							production.producerCredits?.length > 0 && (
								<Fragment>

									<Fragment>{' … '}</Fragment>

									<ProducerCredits credits={production.producerCredits} />

								</Fragment>
							)
						}

					</li>
				)
			}

		</ListWrapper>
	);

};

export default ProducerProductionsList;
