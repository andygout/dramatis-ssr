import AppendedProductionTeamCredits from './AppendedProductionTeamCredits.jsx';
import ListWrapper from './ListWrapper.jsx';
import ProductionLinkWithContext from './ProductionLinkWithContext.jsx';

const CreativeProductionsList = (props) => {
	const { productions } = props;

	return (
		<ListWrapper>
			{productions.map((production, index) => (
				<li key={index}>
					<ProductionLinkWithContext production={production} />

					{production.creativeCredits?.length > 0 && (
						<AppendedProductionTeamCredits credits={production.creativeCredits} />
					)}
				</li>
			))}
		</ListWrapper>
	);
};

export default CreativeProductionsList;
