import { v4 as uuid } from 'node-uuid';

import dbQuery from '../database/db-query';
import esc from '../lib/escape-string';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';
import Theatre from './theatre';

export default class Production {

	constructor (props = {}) {

		Object.defineProperty(this, 'model', {
			get: function () { return 'production'; }
		});

		this.uuid = props.uuid;
		this.title = props.title;
		this.pageTitle = props.pageTitle;
		this.documentTitle = props.documentTitle;
		this.theatre = new Theatre({ name: props.theatreName });
		this.hasError = false;
		this.errors = {};

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

		if (this.setErrorStatus()) return Promise.resolve({ production: this });

		return this.theatre.create()
			.then(({ uuid: theatreUuid }) => {

				return dbQuery(`
					MATCH (t:Theatre { uuid: '${theatreUuid}' })
					CREATE (p:Production { uuid: '${uuid()}', title: '${esc(this.title)}' })-[:PLAYS_AT]->(t)
					RETURN {
						model: 'production',
						uuid: p.uuid,
						title: p.title
					} AS production
				`);

			});

	};

	edit () {

		return dbQuery(`
			MATCH (p:Production { uuid: '${esc(this.uuid)}' })-[:PLAYS_AT]->(t:Theatre)
			RETURN {
				model: 'production',
				uuid: p.uuid,
				title: p.title,
				theatre: {
					model: 'theatre',
					name: t.name
				}
			} AS production
		`);

	};

	update () {

		if (this.setErrorStatus()) return Promise.resolve({ production: this });

		return this.theatre.create()
			.then(({ uuid: theatreUuid }) => {

				return dbQuery(`
					MATCH (p:Production { uuid: '${esc(this.uuid)}' })-[r:PLAYS_AT]->(Theatre)
					MATCH (t:Theatre { uuid: '${theatreUuid}' })
					DELETE r
					MERGE (p)-[:PLAYS_AT]->(t)
					SET p.title = '${esc(this.title)}'
					RETURN {
						model: 'production',
						uuid: p.uuid,
						title: p.title
					} AS production
				`);

			});

	};

	delete () {

		return dbQuery(`
			MATCH (p:Production { uuid: '${esc(this.uuid)}' })
			WITH p, p.title AS title
			DETACH DELETE p
			RETURN {
				model: 'production',
				title: title
			} AS production
		`);

	};

	show () {

		return dbQuery(`
			MATCH (p:Production { uuid: '${esc(this.uuid)}' })-[:PLAYS_AT]->(t:Theatre)
			RETURN {
				model: 'production',
				uuid: p.uuid,
				title: p.title,
				theatre: {
					model: 'theatre',
					uuid: t.uuid,
					name: t.name
				}
			} AS production
		`);

	};

	static list () {

		return dbQuery(`
			MATCH (p:Production)-[:PLAYS_AT]->(t:Theatre)
			RETURN collect({
				model: 'production',
				uuid: p.uuid,
				title: p.title,
				theatre: {
					model: 'theatre',
					uuid: t.uuid,
					name: t.name
				}
			}) AS productions
		`);

	};

}
