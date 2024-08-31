import { expect } from 'chai';

import getInstanceTitle from '../../../src/lib/get-instance-title.js';

describe('Get Instance Title module', () => {

	context('instance model is AWARD_CEREMONY', () => {

		context('instance does not have an award', () => {

			it('returns requisite title', () => {

				const instance = {
					model: 'AWARD_CEREMONY',
					name: '2020',
					award: null
				};

				expect(getInstanceTitle(instance)).to.equal('2020');

			});

		});

		context('instance has an award', () => {

			it('returns requisite title', () => {

				const instance = {
					model: 'AWARD_CEREMONY',
					name: '2020',
					award: {
						name: 'Laurence Olivier Awards'
					}
				};

				expect(getInstanceTitle(instance)).to.equal('Laurence Olivier Awards 2020');

			});

		});

	});

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
