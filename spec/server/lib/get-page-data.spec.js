const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const productionInstanceFixture = require('../../fixtures/productions/instance');
const theatreInstanceFixture = require('../../fixtures/theatres/instance');

let productionInstance;
let theatreInstance;

const resetInstances = () => {

	productionInstance = productionInstanceFixture();
	theatreInstance = theatreInstanceFixture();

};

const stubs = {
	instanceNamingValue: sinon.stub().returns('Hamlet')
};

const resetStubs = () => {

	stubs.instanceNamingValue.reset();

};

beforeEach(() => {

	resetInstances();
	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/lib/get-page-data', {
		'./instance-naming-value': stubOverrides.instanceNamingValue || stubs.instanceNamingValue
	});

describe('Get Page Data module', () => {

	describe('documentTitle property', () => {

		context('create action', () => {

			it('will read \' | New <model>\'', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'create');
				expect(pageData.documentTitle).to.eq(' | New production');

			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will read \' | Edit: <instance> (<theatre name>) (<model>)\'', () => {

					const subject = createSubject();
					const pageData = subject(productionInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Hamlet (Almeida Theatre) (production)');

				});

			});

			context('theatre instance', () => {

				it('will read \' | Edit: <instance> (<model>)\'', () => {

					const subject = createSubject({ instanceNamingValue: sinon.stub().returns('Almeida Theatre') });
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Almeida Theatre (theatre)');

				});

			});

		});

		context('show action', () => {

			context('production instance', () => {

				it('will prioritise use of documentTitle property over generated value', () => {

					const subject = createSubject();
					productionInstance.documentTitle = ' | Macbeth (Hampstead Theatre) (production)';
					const pageData = subject(productionInstance, 'show');
					expect(pageData.documentTitle).to.eq(' | Macbeth (Hampstead Theatre) (production)');

				});

				it('will generate text (\' | <instance> (<theatre name>) (<model>)\') when documentTitle absent', () => {

					const subject = createSubject();
					const pageData = subject(productionInstance, 'show');
					expect(pageData.documentTitle).to.eq(' | Hamlet (Almeida Theatre) (production)');

				});

			});

			context('theatre instance', () => {

				it('will read \' | <instance> (<model>)\'', () => {

					const subject = createSubject({ instanceNamingValue: sinon.stub().returns('Almeida Theatre') });
					const pageData = subject(theatreInstance, 'show');
					expect(pageData.documentTitle).to.eq(' | Almeida Theatre (theatre)');

				});

			});

		});

	});

	describe('title property', () => {

		context('create action', () => {

			it('will read \'New <model>\'', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'create');
				expect(pageData.title).to.eq('New production');

			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will prioritise use of pageTitle property over title property', () => {

					const subject = createSubject();
					productionInstance.pageTitle = 'Macbeth';
					const pageData = subject(productionInstance, 'update');
					expect(pageData.title).to.eq('Macbeth');

				});

				it('will use title when pageTitle absent', () => {

					const subject = createSubject();
					productionInstance.pageTitle = undefined;
					const pageData = subject(productionInstance, 'update');
					expect(pageData.title).to.eq('Hamlet');

				});

			});

			context('theatre instance', () => {

				it('will prioritise use of pageTitle property over name property', () => {

					const subject = createSubject({ instanceNamingValue: sinon.stub().returns('Almeida Theatre') });
					theatreInstance.pageTitle = 'Hampstead Theatre';
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.title).to.eq('Hampstead Theatre');

				});

				it('will use name when pageTitle absent', () => {

					const subject = createSubject({ instanceNamingValue: sinon.stub().returns('Almeida Theatre') });
					theatreInstance.pageTitle = undefined;
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.title).to.eq('Almeida Theatre');

				});

			});

		});

	});

	describe('formAction property', () => {

		context('create action', () => {

			it('will be path comprised of pluralised model name', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'create');
				expect(pageData.formAction).to.eq('/productions');

			});

		});

		context('update action', () => {

			it('will be path comprised of pluralised model name and instance uuid', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'update');
				expect(pageData.formAction).to.eq('/productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

			});

		});

	});

	describe('submitValue property', () => {

		context('create action', () => {

			it('will be comprised of action (\'Create\') and model name', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'create');
				expect(pageData.submitValue).to.eq('Create production');

			});

		});

		context('update action', () => {

			it('will be comprised of action (\'Update\') and model name', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'update');
				expect(pageData.submitValue).to.eq('Update production');

			});

		});

	});

});
