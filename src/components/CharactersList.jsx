import AppendedQualifier from './AppendedQualifier.jsx';
import InstanceLink from './InstanceLink.jsx';
import ListWrapper from './ListWrapper.jsx';

const CharactersList = props => {

	const { characters } = props;

	return (
		<ListWrapper>

			{
				characters.map((character, index) =>
					<li key={index}>

						<InstanceLink instance={character} />

						{
							character.qualifier && (
								<AppendedQualifier qualifier={character.qualifier} />
							)
						}

					</li>
				)
			}

		</ListWrapper>
	);

};

export default CharactersList;
