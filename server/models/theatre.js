import dbQuery from '../database/db-query';
import * as cypherTemplates from '../lib/cypher-templates/shared';
import { getValidateDeleteQuery, getShowQuery } from '../lib/cypher-templates/theatre';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';

export default class Theatre {

	constructor (props = {}) {

		Object.defineProperty(this, 'model', {
			get: function () { return 'theatre'; }
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

		return dbQuery({ query: cypherTemplates.getValidateUpdateQuery(this.model), params: this })
			.then(({ theatreCount }) => {

				if (theatreCount > 0) this.errors.name = ['Name already exists'];

			});

	};

	validateDeleteInDb () {

		return dbQuery({ query: getValidateDeleteQuery(), params: this })
			.then(({ relationshipCount }) => {

				if (relationshipCount > 0) this.errors.associations = ['productions'];

			});

	};

	edit () {

		return dbQuery({ query: cypherTemplates.getEditQuery(this.model), params: this });

	};

	update () {

		this.validate({ required: true });

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve({ theatre: this });

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ theatre: this });

				return dbQuery({ query: cypherTemplates.getUpdateQuery(this.model), params: this });

			});

	};

	delete () {

		return this.validateDeleteInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ theatre: this });

				return dbQuery({ query: cypherTemplates.getDeleteQuery(this.model), params: this });

			});

	};

	show () {

		return dbQuery({ query: getShowQuery(), params: this });

	};

	static list () {

		return dbQuery({ query: cypherTemplates.getListQuery('theatre') });

	};

}
