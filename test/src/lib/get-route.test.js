import { expect } from 'chai';

import { getRouteFromModel } from '../../../src/lib/get-route';

describe('Get Route module', () => {

	describe('getRouteFromModel function', () => {

		context('route can be acquired by converting model to plural form', () => {

			it('returns model with tailing \'s\' added', () => {

				expect(getRouteFromModel('production')).to.equal('productions');

			});

		});

		context('model requires mapping to acquire route', () => {

			it('returns route', () => {

				const models = [
					{ name: 'awardCeremony', route: 'awards/ceremonies' }
				];

				models.forEach(model => {

					expect(getRouteFromModel(model.name)).to.equal(model.route);

				});

			});

		});

	});

});
