const getShowQuery = () => `
	MATCH (character:Character { uuid: $uuid })
	OPTIONAL MATCH (character)<-[:INCLUDES_CHARACTER]-(playtext:Playtext)
	OPTIONAL MATCH (playtext)<-[:PRODUCTION_OF]-(productionForVariantNamedRoles:Production)<-[:PERFORMS_IN]-(:Person)-
		[:PERFORMS_AS { prodUuid: productionForVariantNamedRoles.uuid }]->(variantNamedRole:Role)
		WHERE character.name <> variantNamedRole.name AND character.name = variantNamedRole.characterName
	OPTIONAL MATCH (playtext)<-[prodRel:PRODUCTION_OF]-(production:Production)<-
		[castRel:PERFORMS_IN]-(person:Person)-[roleRel:PERFORMS_AS { prodUuid: production.uuid }]->(role:Role)
		WHERE character.name = role.name OR character.name = role.characterName
	OPTIONAL MATCH (person)-[otherRoleRel:PERFORMS_AS { prodUuid: production.uuid }]->(otherRole:Role)
		WHERE otherRole.name <> character.name
		AND (NOT EXISTS(otherRole.characterName) OR otherRole.characterName <> character.name)
	OPTIONAL MATCH (otherRole)<-[otherRoleRel]-(person)-[castRel]->(production)-[prodRel]->(playtext)-
		[:INCLUDES_CHARACTER]->(otherCharacter:Character)
		WHERE otherRole.name = otherCharacter.name OR otherRole.characterName = otherCharacter.name
	OPTIONAL MATCH (production)-[:PLAYS_AT]->(theatre:Theatre)
	WITH character, playtext, variantNamedRole, production, theatre, castRel, person, role, otherRole, otherRoleRel, otherCharacter
		ORDER BY otherRoleRel.position
	WITH character, playtext, variantNamedRole, production, theatre, castRel, person, role,
		COLLECT(CASE WHEN otherRole IS NULL THEN null ELSE
				{ model: 'character', uuid: otherCharacter.uuid, name: otherRole.name }
			 END) AS otherRoles
		ORDER BY castRel.position
	WITH character, playtext, variantNamedRole, production, theatre,
		COLLECT({
			model: 'person',
			uuid: person.uuid,
			name: person.name,
			role: { name: role.name },
			otherRoles: otherRoles
		}) AS performers
		ORDER BY production.name, theatre.name
	RETURN {
		model: 'character',
		uuid: character.uuid,
		name: character.name,
		playtexts: COLLECT(DISTINCT(CASE WHEN playtext IS NULL THEN null ELSE
				{ model: 'playtext', uuid: playtext.uuid, name: playtext.name }
			END)),
		variantNames: COLLECT(DISTINCT(variantNamedRole.name)),
		productions: COLLECT(DISTINCT(CASE WHEN production IS NULL THEN null ELSE
				{
					model: 'production',
					uuid: production.uuid,
					name: production.name,
					theatre: { model: 'theatre', uuid: theatre.uuid, name: theatre.name },
					performers: performers
				}
			END))
	} AS character
`;

export {
	getShowQuery
};
