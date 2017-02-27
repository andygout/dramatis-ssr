import directly from 'directly';
import path from 'path';

import dbQuery from './db-query';
import capitalise from '../lib/capitalise';

const createConstraint = model => dbQuery(`
		CREATE CONSTRAINT ON (node:${model})
		ASSERT node.uuid IS UNIQUE
	`, { isReqdResult: false });

const models = require('fs')
	.readdirSync(path.join(__dirname, '..', 'models'))
	.map(file => capitalise(file.replace('.js', '')));

const modelConstraintFunctions = models.map(model => () => createConstraint(model));

export default () => directly(1, modelConstraintFunctions);
