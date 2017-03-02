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
	`, { isReqdResult: false })
		.then(() => console.log(`Constraint created for ${model}`))
		.catch(err => console.log(`Error attempting to create constraint for ${model}: `, err));

export default () => {

	return dbQuery('CALL db.constraints()', { isReqdResult: false, returnArray: true })
		.then(constraints => {

			const modelsWithConstraints = constraints.map(constraint => constraint.description.match(/:(.*) \)/)[1]);

			const modelsToConstrain = models.filter(model => modelsWithConstraints.indexOf(model) < 0);

			if (!modelsToConstrain.length) return Promise.resolve().then(() => console.log('No constraints required'));

			const modelConstraintFunctions = modelsToConstrain.map(model => () => createConstraint(model));

			return directly(1, modelConstraintFunctions).then(() => console.log('All constraints created'));

		})
		.catch(err => console.log('Error attempting: CALL db.constraints(): ', err));

}
