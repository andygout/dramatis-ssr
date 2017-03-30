import dbQuery from '../database/db-query';
import esc from '../lib/escape-string';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';

export default class Person {

	constructor (props = {}) {

		Object.defineProperty(this, 'model', {
			get: function () { return 'person'; }
		});

		this.uuid = props.uuid;
		this.name = props.name;
		this.pageTitle = props.pageTitle;
		this.productions = [];
		this.hasError = false;
		this.errors = {};

	};

	validate (opts = {}) {

		trimStrings(this);

		const nameErrors = validateString(this.name, 'Name', opts);

		if (nameErrors.length) this.errors.name = nameErrors;

	};

	validateUpdateInDb () {

		return dbQuery(`
			MATCH (p:Person { name: '${esc(this.name)}' }) WHERE p.uuid <> '${esc(this.uuid)}'
			RETURN SIGN(COUNT(p)) AS personCount
		`)
			.then(({ personCount }) => {

				if (personCount > 0) this.errors.name = ['Name already exists'];

			});

	};

	edit () {

		return dbQuery(`
			MATCH (p:Person { uuid: '${esc(this.uuid)}' })
			RETURN {
				model: 'person',
				uuid: p.uuid,
				name: p.name
			} AS person
		`);

	};

	update () {

		this.validate({ mandatory: true });

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve({ person: this });

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ person: this });

				return dbQuery(`
					MATCH (p:Person { uuid: '${esc(this.uuid)}' })
					SET p.name = '${esc(this.name)}'
					RETURN {
						model: 'person',
						uuid: p.uuid,
						name: p.name
					} AS person
				`);

			});

	};

	delete () {

		return dbQuery(`
			MATCH (p:Person { uuid: '${esc(this.uuid)}' })
			WITH p, p.name AS name
			DETACH DELETE p
			RETURN {
				model: 'person',
				name: name
			} AS person
		`);

	};

	show () {

		return dbQuery(`
			MATCH (p:Person { uuid: '${esc(this.uuid)}' })
			OPTIONAL MATCH (p)-[:PERFORMS_IN]->(prd:Production)-[:PLAYS_AT]->(t:Theatre)
			WITH p, t, CASE WHEN prd IS NOT NULL THEN
				collect({
					model: 'production',
					uuid: prd.uuid,
					title: prd.title,
					theatre: {
						model: 'theatre',
						uuid: t.uuid,
						name: t.name
					}
				})
			ELSE
				[]
			END AS productions
			RETURN {
				model: 'person',
				uuid: p.uuid,
				name: p.name,
				productions: productions
			} AS person
		`);

	};

	static list () {

		return dbQuery(`
			MATCH (p:Person)
			RETURN collect({
				model: 'person',
				uuid: p.uuid,
				name: p.name
			}) AS people
		`);

	};

}
