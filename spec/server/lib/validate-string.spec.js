const expect = require('chai').expect;

const subject = require('../../../server/lib/validate-string');

const constants = require('../../../server/lib/constants');

const validLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH)}`;
const subMinLengthString = `${'a'.repeat(constants.STRING_MIN_LENGTH - 1)}`;
const surMaxLengthString = `${'a'.repeat(constants.STRING_MAX_LENGTH + 1)}`;

describe('Validate string module', () => {

	context('valid data', () => {

		it('will not add error to titleErrors array if title string is acceptable length', () => {
			expect(subject(validLengthString, 'Title')).to.deep.eq([]);
		});

	});

	context('invalid data', () => {

		it('will add error to titleErrors array if title string is too short', () => {
			expect(subject(subMinLengthString, 'Title')).to.deep.eq(['Title is too short']);
		});

		it('will add error to titleErrors array if title string is too long', () => {
			expect(subject(surMaxLengthString, 'Title')).to.deep.eq(['Title is too long']);
		});

	});

});
