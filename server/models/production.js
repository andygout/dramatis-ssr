import dbQuery from '../database/db-query';
import * as cypherTemplatesProduction from '../lib/cypher-templates/production';
import { getDeleteQuery, getListQuery } from '../lib/cypher-templates/shared';
import prepareAsParams from '../lib/prepare-as-params';
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
		this.theatre = new Theatre(props.theatre);
		this.cast = props.cast ?
			props.cast
				.filter(castMember => castMember.name.length)
				.map(castMember => new Person(castMember)) :
			[];
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

		this.cast.forEach(castMember => castMember.validate());

		return this.hasError = verifyErrorPresence(this);

	};

	create () {

		if (this.setErrorStatus()) return Promise.resolve({ production: this });

		return dbQuery({ query: cypherTemplatesProduction.getCreateQuery(), params: prepareAsParams(this) });

	};

	edit () {

		return dbQuery({ query: cypherTemplatesProduction.getEditQuery(), params: { uuid: this.uuid } });

	};

	update () {

		if (this.setErrorStatus()) return Promise.resolve({ production: this });

		return dbQuery({ query: cypherTemplatesProduction.getUpdateQuery(), params: prepareAsParams(this) });

	};

	delete () {

		return dbQuery({ query: getDeleteQuery(this) });

	};

	show () {

		return dbQuery({ query: cypherTemplatesProduction.getShowQuery(), params: { uuid: this.uuid } });

	};

	static list () {

		return dbQuery({ query: getListQuery('production') });

	};

}
