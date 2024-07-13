import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedEntities, ListWrapper } from './index.js';

const ProductionTeamCreditsList = props => {

	const { credits } = props;

	return (
		<ListWrapper>

			{
				credits.map((credit, index) =>
					<li key={index}>

						{ credit.name }

						{
							credit.entities?.length > 0 && (
								<AppendedEntities entities={credit.entities} />
							)
						}

					</li>
				)
			}

		</ListWrapper>
	);

};

export default ProductionTeamCreditsList;
