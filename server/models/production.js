import dbQuery from '../database/db-query';
import * as cypherTemplatesProduction from '../lib/cypher-templates/production';
import { deleteQuery, listQuery } from '../lib/cypher-templates/shared';
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

		return dbQuery(cypherTemplatesProduction.createQuery(this));

	};

	edit () {

		return dbQuery(cypherTemplatesProduction.editQuery(this));

	};

	update () {

		if (this.setErrorStatus()) return Promise.resolve({ production: this });

		return dbQuery(cypherTemplatesProduction.updateQuery(this));

	};

	delete () {

		return dbQuery(deleteQuery(this));

	};

	show () {

		return dbQuery(cypherTemplatesProduction.showQuery(this));

	};

	static list () {

		return dbQuery(listQuery('production'));

	};

}
