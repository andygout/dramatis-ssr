const expect = require('chai').expect;

const subject = require('../../../../dist/lib/handlebars-helpers/join');

describe('Join handlebars helper', () => {

	it('will return specified property value from each object in array as single concatenated string', () => {

		const objectArray = [{ name: 'Hamlet' }, { name: 'Claudius' }, { name: 'Gertrude' }];
		expect(subject(objectArray, 'name')).to.eq('Hamlet / Claudius / Gertrude');

	});

});
