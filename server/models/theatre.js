import query from '../../database/query';
import renewTopLevelValues from '../lib/renew-top-level-values';
import { select, update, deletion, createIfNotExists, checkIfExists } from '../lib/sql-templates';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';
import Production from './production';

export default class Theatre {

	constructor (props = {}) {

		this.id = props.id;
		this.name = props.name;
		this.pageTitleText = props.pageTitleText;
		this.productions = [];
		this.hasError = false;
		this.errors = {};

	};

	validate () {

		trimStrings(this);

		const nameErrors = validateString(this.name, 'Name');

		if (nameErrors.length) this.errors.name = nameErrors;

	};

	validateUpdateInDb () {

		const text = checkIfExists(this);

		return query({ text })
			.then(result => {

				if (result.length) this.errors.name = ['Name already exists'];

			});

	};

	validateDeleteInDb () {

		const text = select(this, {
			select1: true,
			table: 'productions',
			where: true,
			id: 'theatre_id',
			limit: '1'
		});

		return query({ text })
			.then(result => {

				if (result.length) this.errors.associations = ['productions'];

			});

	}

	getShowData () {

		const theatre = query({
			text: select(this, { where: true }),
			isReqdResult: true
		});

		const productions = query({
			text: select(this, { table: 'productions', where: true, id: 'theatre_id' })
		});

		return Promise.all([theatre, productions])
			.then(([[theatre], productions] = [theatre, productions]) => {

				this.renewValues(Object.assign(theatre, { productions }));

				return this;

			});

	}

	renewValues (props = {}) {

		renewTopLevelValues(this, props);

		this.productions = props.productions ? props.productions.map(production => new Production(production)) : [];

	};

	create () {

		const queryData = {
			text: createIfNotExists(this),
			isReqdResult: true
		};

		return query(queryData);

	};

	edit () {

		const queryData = {
			text: select(this, { where: true }),
			isReqdResult: true
		};

		return query(queryData)
			.then(([theatre] = theatre) => {

				renewTopLevelValues(this, theatre);

				return this;

			});

	};

	update () {

		this.validate();

		if (verifyErrorPresence(this)) {

			this.hasError = true;

			return Promise.resolve(this);

		}

		return this.validateUpdateInDb()
			.then(() => {

				this.hasError = verifyErrorPresence(this);

				if (this.hasError) return Promise.resolve(this);

				const queryData = {
					text: update(this, { name: this.name }),
					isReqdResult: true
				};

				return query(queryData)
					.then(([theatre] = theatre) => {

						renewTopLevelValues(this, theatre);

						return this;

					});

			});

	};

	delete () {

		return this.validateDeleteInDb()
			.then(() => {

				if (verifyErrorPresence(this)) {

					this.hasError = true;

					return this.getShowData();

				}

				const queryData = {
					text: deletion(this),
					isReqdResult: true
				};

				return query(queryData)
					.then(([theatre] = theatre) => {

						renewTopLevelValues(this, theatre);

						return this;

					});

			});

	};

	show () {

		return this.getShowData();

	};

	static list () {

		const text = select(this, { table: 'theatres', order: true });

		return query({ text })
			.then(theatresRows => {

				const theatres = theatresRows.map(theatre => new Theatre(theatre));

				return theatres;

			});

	};

}
