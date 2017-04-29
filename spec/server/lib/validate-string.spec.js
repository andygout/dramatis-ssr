const expect = require('chai').expect;

const constants = require('../../../dist/config/constants');

const validLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH)}`;
const subMinLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH - 1)}`;
const surMaxLengthString = `${'a'.repeat(constants.STRING_MAX_LENGTH + 1)}`;

const subject = require('../../../dist/lib/validate-string');

describe('Validate String module', () => {

	context('valid data', () => {

		it('will not add error to stringErrors array if string is acceptable length', () => {

			expect(subject(validLengthString, 'Title')).to.deep.eq([]);

		});

		it('will not add error to stringErrors array if string has no length but is not required', () => {

			expect(subject(subMinLengthString, 'Title')).to.deep.eq([]);

		});

	});

	context('invalid data', () => {

		it('will add error to stringErrors array if string is too short and is required', () => {

			expect(subject(subMinLengthString, 'Title', { required: true })).to.deep.eq(['Title is too short']);

		});

		it('will add error to stringErrors array if string is too long', () => {

			expect(subject(surMaxLengthString, 'Title')).to.deep.eq(['Title is too long']);

		});

	});

});
