import dbQuery from '../database/db-query';
import * as cypherTemplates from '../lib/cypher-templates/shared';
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

		return dbQuery({ query: cypherTemplates.getValidateUpdateQuery(this.model), params: this })
			.then(({ personCount }) => {

				if (personCount > 0) this.errors.name = ['Name already exists'];

			});

	};

	edit () {

		return dbQuery({ query: cypherTemplates.getEditQuery(this.model), params: this });

	};

	update () {

		this.validate({ mandatory: true });

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve({ person: this });

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ person: this });

				return dbQuery({ query: cypherTemplates.getUpdateQuery(this.model), params: this });

			});

	};

	delete () {

		return dbQuery({ query: cypherTemplates.getDeleteQuery(this.model), params: this });

	};

	show () {

		return dbQuery({ query: cypherTemplates.getShowQuery(this.model), params: this });

	};

	static list () {

		return dbQuery({ query: cypherTemplates.getListQuery('person') });

	};

}
