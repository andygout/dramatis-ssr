import AppendedEntities from './AppendedEntities.jsx';
import ListWrapper from './ListWrapper.jsx';

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
