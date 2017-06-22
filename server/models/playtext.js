import dbQuery from '../database/db-query';
import { getDeleteQuery } from '../lib/cypher-templates/shared';
import { getShowQuery } from '../lib/cypher-templates/playtext';
import Base from './base';

export default class Playtext extends Base {

	constructor (props = {}) {

		super(props);

		Object.defineProperty(this, 'model', {
			get: function () { return 'playtext'; }
		});

		this.productions = [];

	};

	delete () {

		return dbQuery({ query: getDeleteQuery(this.model), params: this });

	};

	show () {

		return dbQuery({ query: getShowQuery(), params: this });

	};

};
