import { expect } from 'chai';

import { getModelFromRoute, getPluralisedModelFromRoute } from '../../../src/lib/get-model';

describe('Get Model module', () => {

	describe('getModelFromRoute function', () => {

		context('model can be acquired by converting route to singular form', () => {

			it('returns route with tailing \'s\' removed', () => {

				expect(getModelFromRoute('productions')).to.equal('production');

			});

		});

		context('route requires mapping to acquire model', () => {

			it('returns model name', () => {

				const models = [
					{ name: 'awardCeremony', route: 'awards/ceremonies' }
				];

				models.forEach(model => {

					expect(getModelFromRoute(model.route)).to.equal(model.name);

				});

			});

		});

	});

	describe('getPluralisedModelFromRoute function', () => {

		context('route is the same as pluralised model', () => {

			it('returns route', () => {

				expect(getPluralisedModelFromRoute('productions')).to.equal('productions');

			});

		});

		context('route requires mapping to acquire pluralised model', () => {

			it('returns pluralised model name', () => {

				const pluralisedModels = [
					{ name: 'awardCeremonies', route: 'awards/ceremonies' }
				];

				pluralisedModels.forEach(pluralisedModel => {

					expect(getPluralisedModelFromRoute(pluralisedModel.route)).to.equal(pluralisedModel.name);

				});

			});

		});

	});

});
