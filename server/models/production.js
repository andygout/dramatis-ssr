import query from '../database/query';
import renewTopLevelValues from '../lib/renew-top-level-values';
import * as sqlTemplates from '../lib/sql-templates';
import trimStrings from '../lib/trim-strings';
import validateString from '../lib/validate-string';
import verifyErrorPresence from '../lib/verify-error-presence';
import Theatre from './theatre';

export default class Production {

	constructor (props = {}) {

		this.id = props.id;
		this.title = props.title;
		this.pageTitleText = props.pageTitleText;
		this.theatre = new Theatre({ id: props.theatre_id, name: props.theatre_name });
		this.hasError = false;
		this.errors = {};

	};

	validate () {

		trimStrings(this);

		const titleErrors = validateString(this.title, 'Title');

		if (titleErrors.length) this.errors.title = titleErrors;

	};

	renewValues (props = {}) {

		renewTopLevelValues(this, props);

		renewTopLevelValues(this.theatre, { id: props.theatre_id, name: props.theatre_name });

	};

	create () {

		this.validate();

		this.theatre.validate();

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve(this);

		return this.theatre.create()
			.then(([theatre] = theatre) => {

				const queryData = {
					text: sqlTemplates.create(this, { title: this.title, theatre_id: theatre.id }),
					isReqdResult: true
				};

				return query(queryData)
					.then(([production] = production) => {

						renewTopLevelValues(this, production);

						return this;

					});

			});

	};

	edit () {

		const queryData = {
			text: sqlTemplates.select(this, { selectCols: true, join: 'theatre', where: true, id: 'productions.id' }),
			isReqdResult: true
		};

		return query(queryData)
			.then(([production] = production) => {

				this.renewValues(production);

				return this;

			});

	};

	update () {

		this.validate();

		this.theatre.validate();

		this.hasError = verifyErrorPresence(this);

		if (this.hasError) return Promise.resolve(this);

		return this.theatre.create()
			.then(([theatre] = theatre) => {

				const queryData = {
					text: sqlTemplates.update(this, { title: this.title, theatre_id: theatre.id }),
					isReqdResult: true
				};

				return query(queryData)
					.then(([production] = production) => {

						renewTopLevelValues(this, production);

						return this;

					});

			});

	};

	delete () {

		const queryData = {
			text: sqlTemplates.deletion(this),
			isReqdResult: true
		};

		return query(queryData)
			.then(([production] = production) => {

				renewTopLevelValues(this, production);

				return this;

			});

	};

	show () {

		const queryData = {
			text: sqlTemplates.select(this, { selectCols: true, join: 'theatre', where: true, id: 'productions.id' }),
			isReqdResult: true
		};

		return query(queryData)
			.then(([production] = production) => {

				this.renewValues(production);

				return this;

			});

	};

	static list () {

		const text = sqlTemplates.select(this, {
			table: 'productions',
			selectCols: true,
			join: 'theatre',
			order: true
		});

		return query({ text })
			.then(productionsRows => {

				const productions = productionsRows.map(production => new Production(production));

				return productions;

			});

	};

}
