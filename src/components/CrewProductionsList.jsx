import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedProductionTeamCredits, ProductionLinkWithContext, ListWrapper } from './index.js';

const CrewProductionsList = props => {

	const { productions } = props;

	return (
		<ListWrapper>

			{
				productions.map((production, index) =>
					<li key={index}>

						<ProductionLinkWithContext production={production} />

						{
							production.crewCredits?.length > 0 && (
								<AppendedProductionTeamCredits credits={production.crewCredits} />
							)
						}

					</li>
				)
			}

		</ListWrapper>
	);

};

export default CrewProductionsList;
