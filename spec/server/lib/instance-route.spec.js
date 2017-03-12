const expect = require('chai').expect;

const subject = require('../../../dist/lib/instance-route');

describe('Instance Route module', () => {

	it('will return URL (pluralised model name and uuid) for instance', () => {

		const productionInstance = { model: 'production', uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' };
		expect(subject(productionInstance)).to.eq('/productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

	});

});
