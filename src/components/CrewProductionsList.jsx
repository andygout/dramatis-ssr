import AppendedProductionTeamCredits from './AppendedProductionTeamCredits.jsx';
import ProductionLinkWithContext from './ProductionLinkWithContext.jsx';
import ListWrapper from './ListWrapper.jsx';

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
