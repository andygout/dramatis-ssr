const expect = require('chai').expect;
const sinon = require('sinon');

const subject = require('../../../server/lib/get-page-data');

const Production = require('../../../server/models/production');
const Theatre = require('../../../server/models/theatre');

const stubs = {
	Production: null,
	Theatre: null
};

const resetStubs = () => {
	stubs.Production = sinon.createStubInstance(Production);
	stubs.Theatre = sinon.createStubInstance(Theatre);
};

beforeEach(function () {
	resetStubs();
});

describe('Get Page Data module', () => {

	describe('title property', () => {

		context('create action', () => {

			it('will read \'New <model>\'', () => {
				const pageData = subject(stubs.Production, 'create');
				expect(pageData.title).to.eq('New production');
			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will prioritise use of pageTitleText over title', () => {
					stubs.Production.title = 'Foo';
					stubs.Production.pageTitleText = 'Bar';
					const pageData = subject(stubs.Production, 'update');
					expect(pageData.title).to.eq('Bar');
				});

				it('will use title when pageTitleText absent', () => {
					stubs.Production.title = 'Foo';
					stubs.Production.pageTitleText = undefined;
					const pageData = subject(stubs.Production, 'update');
					expect(pageData.title).to.eq('Foo');
				});

			});

			context('theatre instance', () => {

				it('will prioritise use of pageTitleText over name', () => {
					stubs.Theatre.name = 'Foo';
					stubs.Theatre.pageTitleText = 'Bar';
					const pageData = subject(stubs.Theatre, 'update');
					expect(pageData.title).to.eq('Bar');
				});

				it('will use name when pageTitleText absent', () => {
					stubs.Theatre.name = 'Foo';
					stubs.Theatre.pageTitleText = undefined;
					const pageData = subject(stubs.Theatre, 'update');
					expect(pageData.title).to.eq('Foo');
				});

			});

		});

	});

	describe('modelName property', () => {

		it('will be the model name of the instance argument', () => {
			const pageData = subject(stubs.Production, 'create');
			expect(pageData.modelName).to.eq('PRODUCTION');
		});

	});

	describe('formAction property', () => {

		context('create action', () => {

			it('will be path comprised of pluralised model name', () => {
				const pageData = subject(stubs.Production, 'create');
				expect(pageData.formAction).to.eq('/productions');
			});

		});

		context('update action', () => {

			it('will be path comprised of pluralised model name and instance id', () => {
				stubs.Production.id = 1;
				const pageData = subject(stubs.Production, 'update');
				expect(pageData.formAction).to.eq('/productions/1');
			});

		});

	});

	describe('submitValue property', () => {

		context('create action', () => {

			it('will be comprised of action (\'Create\') and model name', () => {
				const pageData = subject(stubs.Production, 'create');
				expect(pageData.submitValue).to.eq('Create production');
			});

		});

		context('update action', () => {

			it('will be comprised of action (\'Update\') and model name', () => {
				const pageData = subject(stubs.Production, 'update');
				expect(pageData.submitValue).to.eq('Update production');
			});

		});

	});

	describe('alertText property', () => {

		context('instance does not have errors', () => {

			context('create action', () => {

				it('will be path comprised of past tense of action (\'Create\') and instance title', () => {
					stubs.Production.title = 'Foo';
					const pageData = subject(stubs.Production, 'create');
					expect(pageData.alertText).to.eq('PRODUCTION CREATED: Foo');
				});

			});

			context('update action', () => {

				it('will be path comprised of past tense of action (\'Update\') and instance title', () => {
					stubs.Production.title = 'Foo';
					const pageData = subject(stubs.Production, 'update');
					expect(pageData.alertText).to.eq('PRODUCTION UPDATED: Foo');
				});

			});

			context('delete action', () => {

				it('will be path comprised of past tense of action (\'Delete\') and instance title', () => {
					stubs.Production.title = 'Foo';
					const pageData = subject(stubs.Production, 'delete');
					expect(pageData.alertText).to.eq('PRODUCTION DELETED: Foo');
				});

			});

		});

		context('instance has errors', () => {

			context('create action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					stubs.Production.hasError = true;
					const pageData = subject(stubs.Production, 'create');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

			context('update action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					stubs.Production.hasError = true;
					const pageData = subject(stubs.Production, 'update');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

			context('delete action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					stubs.Production.hasError = true;
					const pageData = subject(stubs.Production, 'delete');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

		});

	});

	describe('alertType property', () => {

		context('instance does not have errors', () => {

			it('will be \'success\'', () => {
				const pageData = subject(stubs.Production, 'create');
				expect(pageData.alertType).to.eq('success');
			});

		});

		context('instance has errors', () => {

			it('will be \'error\'', () => {
				stubs.Production.hasError = true;
				const pageData = subject(stubs.Production, 'create');
				expect(pageData.alertType).to.eq('error');
			});

		});

	});

});
