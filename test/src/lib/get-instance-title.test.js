import { expect } from 'chai';

import getInstanceTitle from '../../../src/lib/get-instance-title';

describe('Get Instance Title module', () => {

	context('instance model is VENUE', () => {

		context('instance does not have a surVenue', () => {

			it('returns requisite title', () => {

				const instance = {
					model: 'VENUE',
					name: 'New Theatre',
					surVenue: null
				};

				expect(getInstanceTitle(instance)).to.equal('New Theatre');

			});

		});

		context('instance has a surVenue', () => {

			it('returns requisite title', () => {

				const instance = {
					model: 'VENUE',
					name: 'Studio Theatre',
					surVenue: {
						name: 'Sheffield Theatres'
					}
				};

				expect(getInstanceTitle(instance)).to.equal('Sheffield Theatres: Studio Theatre');

			});

		});

	});

	context('instance model does not require special handling', () => {

		it('returns requisite title', () => {

			const instance = {
				model: 'PERSON',
				name: 'Paul Higgins'
			};

			expect(getInstanceTitle(instance)).to.equal('Paul Higgins');

		});

	});

});
