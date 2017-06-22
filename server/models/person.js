import dbQuery from '../database/db-query';
import * as cypherTemplates from '../lib/cypher-templates/shared';
import { getDeleteQuery } from '../lib/cypher-templates/shared';
import { getShowQuery } from '../lib/cypher-templates/person';
import Base from './base';
import Role from './role';

export default class Person extends Base {

	constructor (props = {}) {

		super(props);

		Object.defineProperty(this, 'model', {
			get: function () { return 'person'; }
		});

		this.productions = [];
		this.roles = props.roles ?
			props.roles.filter(role => role.name.length).map(role => new Role(role)) :
			[];

	};

	delete () {

		return dbQuery({ query: getDeleteQuery(this.model), params: this });

	};

	show () {

		return dbQuery({ query: getShowQuery(), params: this });

	};

};
