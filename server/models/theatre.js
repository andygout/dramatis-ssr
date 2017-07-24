import dbQuery from '../database/db-query';
import { getDeleteQuery } from '../lib/cypher-queries/shared';
import { getValidateDeleteQuery } from '../lib/cypher-queries/theatre';
import verifyErrorPresence from '../lib/verify-error-presence';
import Base from './base';

export default class Theatre extends Base {

	constructor (props = {}) {

		super(props);

		Object.defineProperty(this, 'model', {
			get: function () { return 'theatre'; }
		});

		this.productions = [];

	};

	validateDeleteInDb () {

		return dbQuery({ query: getValidateDeleteQuery(), params: this })
			.then(({ relationshipCount }) => {

				if (relationshipCount > 0) this.errors.associations = ['productions'];

			});

	};

	delete () {

		return this.validateDeleteInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ theatre: this });

				return dbQuery({ query: getDeleteQuery(this.model), params: this });

			});

	};

};
