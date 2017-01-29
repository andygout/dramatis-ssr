const query = require('../../database/query');
const renewTopLevelValues = require('../lib/renew-top-level-values');
const sqlTemplates = require('../lib/sql-templates');
const trimStrings = require('../lib/trim-strings');
const validateString = require('../lib/validate-string');
const verifyErrorPresence = require('../lib/verify-error-presence');

module.exports = class Theatre {

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

		const text = sqlTemplates.checkIfExists(this);

		return query({ text })
			.then(result => {

				if (result.length) this.errors.name = ['Name already exists'];

			});

	};

	validateDeleteInDb () {

		const text = sqlTemplates.select(this, {
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
			text: sqlTemplates.select(this, { where: true }),
			isReqdResult: true
		});

		const productions = query({
			text: sqlTemplates.select(this, { table: 'productions', where: true, id: 'theatre_id' })
		});

		const _this = this;

		return Promise.all([theatre, productions])
			.then(([[theatre], productions] = [theatre, productions]) => {

				_this.renewValues(Object.assign(theatre, { productions }));

				return _this;

			});

	}

	renewValues (props = {}) {

		const Production = require('./production');

		renewTopLevelValues(this, props);

		this.productions = props.productions ? props.productions.map(production => new Production(production)) : [];

	};

	create () {

		const queryData = {
			text: sqlTemplates.createIfNotExists(this),
			isReqdResult: true
		};

		return query(queryData);

	};

	edit () {

		const queryData = {
			text: sqlTemplates.select(this, { where: true }),
			isReqdResult: true
		};

		const _this = this;

		return query(queryData)
			.then(([theatre] = theatre) => {

				renewTopLevelValues(_this, theatre);

				return _this;

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
					text: sqlTemplates.update(this, { name: this.name }),
					isReqdResult: true
				};

				const _this = this;

				return query(queryData)
					.then(([theatre] = theatre) => {

						renewTopLevelValues(_this, theatre);

						return _this;

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
					text: sqlTemplates.delete(this),
					isReqdResult: true
				};

				const _this = this;

				return query(queryData)
					.then(([theatre] = theatre) => {

						renewTopLevelValues(_this, theatre);

						return _this;

					});

			});

	};

	show () {

		return this.getShowData();

	};

	static list () {

		const text = sqlTemplates.select(this, { table: 'theatres', order: true });

		return query({ text })
			.then(theatresRows => {

				const theatres = theatresRows.map(theatre => new Theatre(theatre));

				return theatres;

			});

	};

}
