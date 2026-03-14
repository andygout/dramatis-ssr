import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import getInstanceTitle from '../../../src/lib/get-instance-title.js';

const context = describe;

describe('Get Instance Title module', () => {
	context('instance model is AWARD_CEREMONY', () => {
		context('instance does not have an award', () => {
			it('returns requisite title', () => {
				const instance = {
					model: 'AWARD_CEREMONY',
					name: '2020',
					award: null
				};

				assert.equal(getInstanceTitle(instance), '2020');
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

				assert.equal(getInstanceTitle(instance), 'Laurence Olivier Awards 2020');
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

				assert.equal(getInstanceTitle(instance), 'New Theatre');
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

				assert.equal(getInstanceTitle(instance), 'Sheffield Theatres: Studio Theatre');
			});
		});
	});

	context('instance model does not require special handling', () => {
		it('returns requisite title', () => {
			const instance = {
				model: 'PERSON',
				name: 'Paul Higgins'
			};

			assert.equal(getInstanceTitle(instance), 'Paul Higgins');
		});
	});
});
