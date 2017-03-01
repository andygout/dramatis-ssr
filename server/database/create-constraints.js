import directly from 'directly';
import path from 'path';

import dbQuery from './db-query';
import capitalise from '../lib/capitalise';

const models = require('fs')
	.readdirSync(path.join(__dirname, '..', 'models'))
	.map(file => capitalise(file.replace('.js', '')));

const createConstraint = model => dbQuery(`
		CREATE CONSTRAINT ON (node:${model})
		ASSERT node.uuid IS UNIQUE
	`, { isReqdResult: false });

export default () => {

	return dbQuery('CALL db.constraints()', { isReqdResult: false, returnArray: true })
		.then(constraints => {

			const modelsWithConstraints = constraints.map(constraint => constraint.description.match(/:(.*) \)/)[1]);

			const modelsToConstrain = models.filter(model => modelsWithConstraints.indexOf(model) < 0);

			const modelConstraintFunctions = modelsToConstrain.map(model => () => createConstraint(model));

			return directly(1, modelConstraintFunctions);

		});

}
