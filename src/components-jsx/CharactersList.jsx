import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { AppendedQualifier, InstanceLink, ListWrapper } from './index.js';

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
