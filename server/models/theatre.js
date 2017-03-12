import { v4 as uuid } from 'node-uuid';

import dbQuery from '../database/db-query';
import esc from '../lib/escape-string';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';

export default class Theatre {

	constructor (props = {}) {

		Object.defineProperty(this, 'model', {
			get: function () { return 'Theatre'; }
		});

		this.uuid = props.uuid;
		this.name = props.name;
		this.pageTitle = props.pageTitle;
		this.productions = [];
		this.hasError = false;
		this.errors = {};

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

	};

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
			RETURN {
				model: 'Theatre',
				uuid: t.uuid,
				name: t.name
			} AS theatre
		`);

	};

	update () {

		this.validate();

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve({ theatre: this });

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ theatre: this });

				return dbQuery(`
					MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })
					SET t.name = '${esc(this.name)}'
					RETURN {
						model: 'Theatre',
						uuid: t.uuid,
						name: t.name
					} AS theatre
				`);

			});

	};

	delete () {

		return this.validateDeleteInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ theatre: this });

				return dbQuery(`
					MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })
					WITH t, t.name AS name
					DETACH DELETE t
					RETURN {
						model: 'Theatre',
						name: name
					} AS theatre
				`);

			});

	};

	show () {

		return dbQuery(`
			MATCH (t:Theatre { uuid: '${esc(this.uuid)}' })
			OPTIONAL MATCH (t)<-[:PLAYS_AT]-(p:Production)
			WITH t, CASE WHEN p IS NOT NULL THEN collect({
				model: 'Production',
				uuid: p.uuid,
				title: p.title
			}) ELSE [] END AS productions
			RETURN {
				model: 'Theatre',
				uuid: t.uuid,
				name: t.name,
				productions: productions
			} AS theatre
		`);

	};

	static list () {

		return dbQuery(`
			MATCH (t:Theatre)
			RETURN collect({
				model: 'Theatre',
				uuid: t.uuid,
				name: t.name
			}) AS theatres
		`);

	};

}
