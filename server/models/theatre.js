import { v4 as uuid } from 'node-uuid';
import dbQuery from '../database/db-query';
import esc from '../lib/escape-string';
import renewValues from '../lib/renew-values';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';
import Production from './production';

export default class Theatre {

	constructor (props = {}) {

		this.uuid = props.uuid;
		this.name = props.name;
		this.pageTitleText = props.pageTitleText;
		this.productions = [];
		this.hasError = false;
		this.errors = {};

		Object.defineProperty(this, 'associations', {
			get: function () { return { 'productions': Production }; }
		});

	};

	validate () {

		trimStrings(this);

		const nameErrors = validateString(this.name, 'Name');

		if (nameErrors.length) this.errors.name = nameErrors;

	};

	validateUpdateInDb () {

		return dbQuery(`
			MATCH (t:Theatre { name: '${esc(this.name)}' }) WHERE t.uuid <> '${esc(this.uuid)}'
			RETURN SIGN(COUNT(t)) AS theatreCount
		`)
			.then(({ theatreCount }) => {

				if (theatreCount > 0) this.errors.name = ['Name already exists'];

			});

	};

	validateDeleteInDb () {

		return dbQuery(`
			MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })<-[r:PLAYS_AT]-(p:Production)
			RETURN SIGN(COUNT(r)) AS relationshipCount
		`)
			.then(({ relationshipCount }) => {

				if (relationshipCount > 0) this.errors.associations = ['productions'];

			});

	}

	getShowData () {

		return dbQuery(`
			MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })
			OPTIONAL MATCH (t)<-[:PLAYS_AT]-(p:Production)
			WITH t, CASE WHEN p IS NOT NULL THEN collect({ uuid: p.uuid, title: p.title }) ELSE [] END AS productions
			RETURN { name: t.name, productions: productions } AS theatre
		`)
			.then(({ theatre }) => renewValues(this, theatre));

	}

	create () {

		return dbQuery(`
			MERGE (t:Theatre { name: '${esc(this.name)}' })
			ON CREATE SET t.uuid = '${uuid()}'
			RETURN t.uuid AS uuid
		`);

	};

	edit () {

		return dbQuery(`
			MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })
			RETURN t.name AS name
		`)
			.then(name => renewValues(this, name));

	};

	update () {

		this.validate();

		if (verifyErrorPresence(this)) {

			this.hasError = true;

			return Promise.resolve(this);

		}

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve(this);

				return dbQuery(`
					MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })
					SET t.name = '${esc(this.name)}'
					RETURN t.name AS name
				`)
					.then(name => renewValues(this, name));

			});

	};

	delete () {

		return this.validateDeleteInDb()
			.then(() => {

				if (verifyErrorPresence(this)) {

					this.hasError = true;

					return this.getShowData();

				}

				return dbQuery(`
					MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })
					WITH t, t.name AS name
					DETACH DELETE t
					RETURN name
				`)
					.then(name => renewValues(this, name));

			});

	};

	show () {

		return this.getShowData();

	};

	static list () {

		return dbQuery(`
			MATCH (t:Theatre)
			RETURN collect({
				uuid: t.uuid,
				name: t.name
			}) AS theatres
		`)
			.then(({ theatres }) => {

				return theatres.map(theatre => new Theatre(theatre));

			});

	};

}
