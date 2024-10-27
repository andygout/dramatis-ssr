import { Fragment } from 'preact';

import { ProducerCredits, ProductionLinkWithContext, ListWrapper } from './index.js';

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
