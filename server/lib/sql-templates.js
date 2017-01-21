const format = require('pg-format');
const modelNamingPropMap = require('./model-naming-prop-map');

const selectColumnsMap = {
	productions: `
		productions.id,
		productions.title,
		theatres.id AS theatre_id,
		theatres.name AS theatre_name
	`
};

const uniqueColumnMap = {
	theatres: 'name'
};

const getTableName = instance => `${instance.constructor.name.toLowerCase()}s`;

const getModelName = instance => instance.constructor.name.toLowerCase();

const createJoin = model => {
	const table = `${model}s`;
	const foreignKey = `${model}_id`;
	const nativeKey = `${model}s.id`;

	return `INNER JOIN ${table} ON ${foreignKey} = ${nativeKey}`;
};

exports.select = (instance, opts) => {
	const table = opts.table || getTableName(instance);
	const columns = opts.selectCols ? selectColumnsMap[table] : '*';
	const id = opts.id || 'id';

	return `
		SELECT ${columns}
		FROM ${table}
		${opts.join ? createJoin(opts.join) : ''}
		${opts.where ? 'WHERE ' + id + ' = ' + format.literal(instance.id) : ''}
		${opts.order ? 'ORDER BY id ASC' : ''}
	`;
};

exports.create = (instance, createValues) => {
	const table = getTableName(instance);

	const columns = [];
	const values = [];

	for (const prop in createValues) {
		if (createValues.hasOwnProperty(prop)) {
			columns.push(prop);
			values.push(format.literal(createValues[prop]));
		}
	}

	return `
		INSERT INTO ${table} (${columns.join(', ')})
		VALUES (${values.join(', ')})
		RETURNING id
	`;
}

exports.update = (instance, updateValues) => {
	const table = getTableName(instance);

	const assignments = [];

	for (const prop in updateValues) {
		if (updateValues.hasOwnProperty(prop)) assignments.push(`${prop} = ${format.literal(updateValues[prop])}`);
	}

	return `
		UPDATE ${table} SET
		${assignments.join(', ')}
		WHERE id = ${format.literal(instance.id)}
		RETURNING id
	`;
};

exports.delete = instance => {
	const table = getTableName(instance);
	const model = getModelName(instance);

	return `
		DELETE FROM ${table}
		WHERE id = ${format.literal(instance.id)}
		RETURNING ${modelNamingPropMap[model]}
	`;
};

exports.createIfNotExists = instance => {
	const table = getTableName(instance);

	return `
		WITH
		i AS (
			INSERT INTO ${table} (${uniqueColumnMap[table]})
			SELECT ${format.literal(instance[uniqueColumnMap[table]])}
			WHERE NOT EXISTS (
				SELECT id
				FROM ${table}
				WHERE ${uniqueColumnMap[table]} = ${format.literal(instance[uniqueColumnMap[table]])}
			)
			RETURNING id
		),
		s AS (
			SELECT id
			FROM ${table}
			WHERE ${uniqueColumnMap[table]} = ${format.literal(instance[uniqueColumnMap[table]])}
		)
		SELECT id
		FROM i
		UNION ALL
		SELECT id
		FROM s
	`;
};

exports.checkIfExists = instance => {
	const table = getTableName(instance);

	return `
		SELECT 1
		FROM ${table}
		WHERE ${uniqueColumnMap[table]} = ${format.literal(instance[uniqueColumnMap[table]])}
		AND id != ${format.literal(instance.id)}
	`;
};
