import dbQuery from '../database/db-query';
import * as cypherTemplates from '../lib/cypher-templates/shared';
import { validateDeleteQuery } from '../lib/cypher-templates/theatre';
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

		return dbQuery(cypherTemplates.validateUpdateQuery(this))
			.then(({ theatreCount }) => {

				if (theatreCount > 0) this.errors.name = ['Name already exists'];

			});

	};

	validateDeleteInDb () {

		return dbQuery(validateDeleteQuery(this.uuid))
			.then(({ relationshipCount }) => {

				if (relationshipCount > 0) this.errors.associations = ['productions'];

			});

	};

	edit () {

		return dbQuery(cypherTemplates.editQuery(this));

	};

	update () {

		this.validate({ mandatory: true });

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve({ theatre: this });

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ theatre: this });

				return dbQuery(cypherTemplates.updateQuery(this));

			});

	};

	delete () {

		return this.validateDeleteInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ theatre: this });

				return dbQuery(cypherTemplates.deleteQuery(this));

			});

	};

	show () {

		return dbQuery(cypherTemplates.showQuery(this));

	};

	static list () {

		return dbQuery(cypherTemplates.listQuery('theatre'));

	};

}
