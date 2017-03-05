import { v4 as uuid } from 'node-uuid';
import dbQuery from '../database/db-query';
import esc from '../lib/escape-string';
import renewValues from '../lib/renew-values';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';
import Theatre from './theatre';

export default class Production {

	constructor (props = {}) {

		this.uuid = props.uuid;
		this.title = props.title;
		this.pageTitleText = props.pageTitleText;
		this.theatre = new Theatre({ uuid: props.theatreUuid, name: props.theatreName });
		this.hasError = false;
		this.errors = {};

	};

	getAssociations () {

		return {};

	};

	validate () {

		trimStrings(this);

		const titleErrors = validateString(this.title, 'Title');

		if (titleErrors.length) this.errors.title = titleErrors;

	};

	setErrorStatus () {

		this.validate();

		this.theatre.validate();

		return this.hasError = verifyErrorPresence(this);

	};

	create () {

		if (this.setErrorStatus()) return Promise.resolve(this);

		return this.theatre.create()
			.then(({ uuid: theatreUuid }) => {

				return dbQuery(`
					MATCH (t:Theatre { uuid: '${theatreUuid}' })
					CREATE (p:Production { uuid: '${uuid()}', title: '${esc(this.title)}' })-[:PLAYS_AT]->(t)
					RETURN { uuid: p.uuid, title: p.title } AS production
				`)
					.then(({ production }) => renewValues(this, production));

			});

	};

	edit () {

		return dbQuery(`
			MATCH (p:Production { uuid: '${esc(this.uuid)}' })-[:PLAYS_AT]->(t:Theatre)
			RETURN { title: p.title, theatre: { name: t.name } } AS production
		`)
			.then(({ production }) => renewValues(this, production));

	};

	update () {

		if (this.setErrorStatus()) return Promise.resolve(this);

		return this.theatre.create()
			.then(({ uuid: theatreUuid }) => {

				return dbQuery(`
					MATCH (p:Production { uuid: '${esc(this.uuid)}' })-[r:PLAYS_AT]->(Theatre)
					MATCH (t:Theatre { uuid: '${theatreUuid}' })
					DELETE r
					MERGE (p)-[:PLAYS_AT]->(t)
					SET p.title = '${esc(this.title)}'
					RETURN { uuid: p.uuid, title: p.title } AS production
				`)
					.then(({ production }) => renewValues(this, production));

			});

	};

	delete () {

		return dbQuery(`
			MATCH (p:Production { uuid: '${esc(this.uuid)}' })
			WITH p, p.title AS title
			DETACH DELETE p
			RETURN title
		`)
			.then(title => renewValues(this, title));

	};

	show () {

		return dbQuery(`
			MATCH (p:Production { uuid: '${esc(this.uuid)}' })-[:PLAYS_AT]->(t:Theatre)
			RETURN { title: p.title, theatre: { uuid: t.uuid, name: t.name } } AS production
		`)
			.then(({ production }) => renewValues(this, production));

	};

	static list () {

		return dbQuery(`
			MATCH (p:Production)-[:PLAYS_AT]->(t:Theatre)
			RETURN collect({
				uuid: p.uuid,
				title: p.title,
				theatreUuid: t.uuid,
				theatreName: t.name
			}) AS productions
		`)
			.then(({ productions }) => {

				return productions.map(production => new Production(production));

			});

	};

}
