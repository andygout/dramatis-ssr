import dbQuery from '../database/db-query';
import { getDeleteQuery } from '../lib/cypher-templates/shared';
import Base from './base';

export default class Character extends Base {

	constructor (props = {}) {

		super(props);

		Object.defineProperty(this, 'model', {
			get: function () { return 'character'; }
		});

		this.productions = [];

	};

	delete () {

		return dbQuery({ query: getDeleteQuery(this.model), params: this });

	};

};
