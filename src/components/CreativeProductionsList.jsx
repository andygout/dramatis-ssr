import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedProductionTeamCredits, ProductionLinkWithContext, ListWrapper } from '.';

const CreativeProductionsList = props => {

	const { productions } = props;

	return (
		<ListWrapper>

			{
				productions.map((production, index) =>
					<li key={index}>

						<ProductionLinkWithContext production={production} />

						{
							production.creativeCredits?.length > 0 && (
								<AppendedProductionTeamCredits credits={production.creativeCredits} />
							)
						}

					</li>
				)
			}

		</ListWrapper>
	);

};

export default CreativeProductionsList;
