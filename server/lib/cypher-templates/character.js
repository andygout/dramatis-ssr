const getShowQuery = () => `
	MATCH (character:Character { uuid: $uuid })
	OPTIONAL MATCH (character)<-[:INCLUDES_CHARACTER]-(playtext:Playtext)
	RETURN {
		model: 'character',
		uuid: character.uuid,
		name: character.name,
		playtexts: CASE WHEN playtext IS NULL THEN [] ELSE
			COLLECT({
				model: 'playtext',
				uuid: playtext.uuid,
				name: playtext.name
			}) END
	} AS character
`;

export {
	getShowQuery
};
