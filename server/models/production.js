import { v4 as uuid } from 'node-uuid';

import dbQuery from '../database/db-query';
import esc from '../lib/escape-string';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';
import Person from './person';
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
		this.person = new Person({ name: props.personName });
		this.hasError = false;
		this.errors = {};

	};

	validate (opts = {}) {

		trimStrings(this);

		const titleErrors = validateString(this.title, 'Title', opts);

		if (titleErrors.length) this.errors.title = titleErrors;

	};

	setErrorStatus () {

		this.validate({ mandatory: true });

		this.theatre.validate({ mandatory: true });

		this.person.validate();

		return this.hasError = verifyErrorPresence(this);

	};

	create () {

		if (this.setErrorStatus()) return Promise.resolve({ production: this });

		const relatedModelPromises = [this.theatre.create()];

		if (this.person.name.length) {
			relatedModelPromises.push(this.person.create());
		}

		return Promise.all(relatedModelPromises)
			.then(results => {

				const theatre = results.find(result => result.theatreUuid);

				const person = results.find(result => result.personUuid) || null;

				const createPersonRelation = person ?
					`WITH prd MATCH (p:Person { uuid: '${person.personUuid}' }) CREATE (prd)<-[:PERFORMS_IN]-(p)` :
					'';

				return dbQuery(`
					CREATE (prd:Production { uuid: '${uuid()}', title: '${esc(this.title)}' })
					WITH prd
					MATCH (t:Theatre { uuid: '${theatre.theatreUuid}' })
					CREATE (prd)-[:PLAYS_AT]->(t)
					${createPersonRelation}
					RETURN {
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
					} AS production
				`);

			});

	};

	edit () {

		return dbQuery(`
			MATCH (prd:Production { uuid: '${esc(this.uuid)}' })
			MATCH (prd)-[:PLAYS_AT]->(t:Theatre)
			OPTIONAL MATCH (prd)<-[:PERFORMS_IN]-(p:Person)
			WITH prd, t, CASE WHEN p IS NOT NULL THEN
				{ model: 'person', name: p.name }
			ELSE
				{ model: 'person', name: '' }
			END AS person
			RETURN {
				model: 'production',
				uuid: prd.uuid,
				title: prd.title,
				theatre: {
					model: 'theatre',
					name: t.name
				},
				person: person
			} AS production
		`);

	};

	update () {

		if (this.setErrorStatus()) return Promise.resolve({ production: this });

		const relatedModelPromises = [this.theatre.create()];

		if (this.person.name.length) {
			relatedModelPromises.push(this.person.create());
		}

		return Promise.all(relatedModelPromises)
			.then(results => {

				const theatre = results.find(result => result.theatreUuid);

				const person = results.find(result => result.personUuid) || null;

				const createPersonRelation = person ?
					`WITH prd MATCH (p:Person { uuid: '${person.personUuid}' }) CREATE (prd)<-[:PERFORMS_IN]-(p)` :
					'';

				return dbQuery(`
					MATCH (prd:Production { uuid: '${esc(this.uuid)}' })
					OPTIONAL MATCH (prd)-[r]-()
					WITH prd, COLLECT (r) AS rels
					FOREACH (r IN rels | DELETE r)
					WITH prd
					MATCH (t:Theatre { uuid: '${theatre.theatreUuid}' })
					CREATE (prd)-[:PLAYS_AT]->(t)
					${createPersonRelation}
					SET prd.title = '${esc(this.title)}'
					RETURN {
						model: 'production',
						uuid: prd.uuid,
						title: prd.title
					} AS production
				`);

			});

	};

	delete () {

		return dbQuery(`
			MATCH (prd:Production { uuid: '${esc(this.uuid)}' })
			WITH prd, prd.title AS title
			DETACH DELETE prd
			RETURN {
				model: 'production',
				title: title
			} AS production
		`);

	};

	show () {

		return dbQuery(`
			MATCH (prd:Production { uuid: '${esc(this.uuid)}' })
			MATCH (prd)-[:PLAYS_AT]->(t:Theatre)
			OPTIONAL MATCH (prd)<-[:PERFORMS_IN]-(p:Person)
			WITH prd, t, CASE WHEN p IS NOT NULL THEN
				{ model: 'person', uuid: p.uuid, name: p.name }
			ELSE
				null
			END AS person
			RETURN {
				model: 'production',
				uuid: prd.uuid,
				title: prd.title,
				theatre: {
					model: 'theatre',
					uuid: t.uuid,
					name: t.name
				},
				person: person
			} AS production
		`);

	};

	static list () {

		return dbQuery(`
			MATCH (prd:Production)-[:PLAYS_AT]->(t:Theatre)
			RETURN collect({
				model: 'production',
				uuid: prd.uuid,
				title: prd.title,
				theatre: {
					model: 'theatre',
					uuid: t.uuid,
					name: t.name
				}
			}) AS productions
		`);

	};

}
