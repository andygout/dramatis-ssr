import AppendedProductionTeamCredits from './AppendedProductionTeamCredits.jsx';
import ProductionLinkWithContext from './ProductionLinkWithContext.jsx';
import ListWrapper from './ListWrapper.jsx';

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
