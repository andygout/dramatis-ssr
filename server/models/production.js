const query = require('../../database/query');
const getPageData = require('../lib/get-page-data');
const renewTopLevelValues = require('../lib/renew-top-level-values');
const sqlTemplates = require('../lib/sql-templates');
const trimStrings = require('../lib/trim-strings');
const validateString = require('../lib/validate-string');
const verifyErrorPresence = require('../lib/verify-error-presence');

module.exports = class Production {

	constructor (props = {}) {

		const Theatre = require('./theatre');

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

	new () {

		const page = getPageData(this, 'create');

		return { page, production: this };

	};

	create () {

		this.validate();

		this.theatre.validate();

		this.hasError = verifyErrorPresence(this);

		const page = getPageData(this, 'create');

		if (this.hasError) return Promise.resolve({ page, production: this });

		return this.theatre.create()
			.then(([theatre] = theatre) => {

				const queryData = {
					text: sqlTemplates.create(this, { title: this.title, theatre_id: theatre.id }),
					isReqdResult: true
				};

				return query(queryData)
					.then(([production] = production) => ({ page, production }));

			});

	};

	edit () {

		const queryData = {
			text: sqlTemplates.select(this, { selectCols: true, join: 'theatre', where: true, id: 'productions.id' }),
			isReqdResult: true
		};

		const _this = this;

		return query(queryData)
			.then(([production] = production) => {

				_this.renewValues(production);

				const page = getPageData(_this, 'update');


				return { page, production: _this };

			});

	};

	update () {

		this.validate();

		this.theatre.validate();

		this.hasError = verifyErrorPresence(this);

		const page = getPageData(this, 'update');

		if (this.hasError) return Promise.resolve({ page, production: this });

		return this.theatre.create()
			.then(([theatre] = theatre) => {

				const queryData = {
					text: sqlTemplates.update(this, { title: this.title, theatre_id: theatre.id }),
					isReqdResult: true
				};

				return query(queryData)
					.then(([production] = production) => ({ page, production }));

			});

	};

	delete () {

		const queryData = {
			text: sqlTemplates.delete(this),
			isReqdResult: true
		};

		const _this = this;

		return query(queryData)
			.then(([production] = production) => {

				renewTopLevelValues(_this, production);

				const page = getPageData(_this, 'delete');

				return { page, production: _this };

			});

	};

	show () {

		const queryData = {
			text: sqlTemplates.select(this, { selectCols: true, join: 'theatre', where: true, id: 'productions.id' }),
			isReqdResult: true
		};

		const _this = this;

		return query(queryData)
			.then(([production] = production) => {

				_this.renewValues(production);

				const page = getPageData(_this, 'show');

				return { page, production: _this };

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

				const page = { title: 'Productions' };

				return { page, productions };

			});

	};

}
