const getShowQuery = () => `
	MATCH (character:Character { uuid: $uuid })
	OPTIONAL MATCH (character)<-[playtextRel:INCLUDES_CHARACTER]-(playtext:Playtext)
	OPTIONAL MATCH (character)<-[playtextRel]-(playtext)<-[prodRel:PRODUCTION_OF]-(production:Production)<-
		[castRel:PERFORMS_IN]-(person:Person)-[roleRel:PERFORMS_AS { prodUuid: production.uuid }]->(role:Role)
		WHERE character.name = role.name OR character.name = role.characterName
	OPTIONAL MATCH (person)-[otherRoleRel:PERFORMS_AS { prodUuid: production.uuid }]->(otherRole:Role)
		WHERE otherRole.name <> character.name
		AND (NOT EXISTS(otherRole.characterName) OR otherRole.characterName <> character.name)
	OPTIONAL MATCH (otherRole)<-[otherRoleRel]-(person)-[castRel]->(production)-[prodRel]->
		(playtext)-[:INCLUDES_CHARACTER]->(otherCharacter:Character)
		WHERE otherRole.name = otherCharacter.name OR otherRole.characterName = otherCharacter.name
	OPTIONAL MATCH (production)-[:PLAYS_AT]->(theatre:Theatre)
	WITH character, production, theatre, castRel, person, role, otherRole, otherRoleRel, otherCharacter,
		CASE WHEN playtext IS NULL THEN [] ELSE
		COLLECT({ model: 'playtext', uuid: playtext.uuid, name: playtext.name }) END AS playtexts
	ORDER BY otherRoleRel.position
	WITH character, playtexts, production, theatre, castRel, person, role,
		CASE WHEN otherRole IS NULL THEN [] ELSE
		COLLECT({ model: 'character', uuid: otherCharacter.uuid, name: otherRole.name }) END AS otherRoles
	ORDER BY castRel.position
	WITH character, playtexts, production, theatre, role,
		COLLECT({
			model: 'person',
			uuid: person.uuid,
			name: person.name,
			role: { name: role.name },
			otherRoles: otherRoles
		}) AS performers
	RETURN {
		model: 'character',
		uuid: character.uuid,
		name: character.name,
		playtexts: playtexts,
		productions: CASE WHEN production IS NULL THEN [] ELSE
			COLLECT({
				model: 'production',
				uuid: production.uuid,
				name: production.name,
				theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name },
				performers: performers
			}) END,
		variantNames: FILTER(roleName IN COLLECT(DISTINCT(role.name)) WHERE roleName <> character.name)
	} AS character
`;

export {
	getShowQuery
};
