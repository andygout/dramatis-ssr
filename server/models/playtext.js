import dbQuery from '../database/db-query';
import * as cypherTemplates from '../lib/cypher-templates/shared';
import { getShowQuery } from '../lib/cypher-templates/playtext';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';

export default class Playtext {

	constructor (props = {}) {

		Object.defineProperty(this, 'model', {
			get: function () { return 'playtext'; }
		});

		this.uuid = props.uuid;
		this.title = props.title;
		this.pageTitle = props.pageTitle;
		this.productions = [];
		this.hasError = false;
		this.errors = {};

	};

	validate (opts = {}) {

		trimStrings(this);

		const titleErrors = validateString(this.title, 'Title', opts);

		if (titleErrors.length) this.errors.title = titleErrors;

	};

	validateUpdateInDb () {

		return dbQuery({ query: cypherTemplates.getValidateUpdateQuery(this.model), params: this })
			.then(({ playtextCount }) => {

				if (playtextCount > 0) this.errors.title = ['Title already exists'];

			});

	};

	edit () {

		return dbQuery({ query: cypherTemplates.getEditQuery(this.model), params: this });

	};

	update () {

		this.validate({ required: true });

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve({ playtext: this });

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve({ playtext: this });

				return dbQuery({ query: cypherTemplates.getUpdateQuery(this.model), params: this });

			});

	};

	delete () {

		return dbQuery({ query: cypherTemplates.getDeleteQuery(this.model), params: this });

	};

	show () {

		return dbQuery({ query: getShowQuery(), params: this });

	};

	static list () {

		return dbQuery({ query: cypherTemplates.getListQuery('playtext') });

	};

}
