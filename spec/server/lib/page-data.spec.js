const expect = require('chai').expect;
const sinon = require('sinon');

const subject = require('../../../server/lib/page-data');
const Production = require('../../../server/models/production');
let productionStub;

const createStubs = () => {
	productionStub = sinon.createStubInstance(Production);
};

beforeEach(function() {
	createStubs();
});

describe('Page data module', () => {

	describe('title property', () => {

		context('create action', () => {

			it('will read \'New <model>\'', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.title).to.eq('New production');
			});

		});

		context('update action', () => {

			it('will prioritise use of preEditedTitle over title', () => {
				productionStub.title = 'Foo';
				productionStub.preEditedTitle = 'Bar';
				const pageData = subject(productionStub, 'update');
				expect(pageData.title).to.eq('Bar');
			});

			it('will use title when preEditedTitle absent', () => {
				productionStub.title = 'Foo';
				productionStub.preEditedTitle = undefined;
				const pageData = subject(productionStub, 'update');
				expect(pageData.title).to.eq('Foo');
			});

		});

	});

	describe('modelName property', () => {

		it('will be the model name of the instance argument', () => {
			const pageData = subject(productionStub, 'create');
			expect(pageData.modelName).to.eq('PRODUCTION');
		});

	});

	describe('formAction property', () => {

		context('create action', () => {

			it('will be path comprised of pluralised model name', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.formAction).to.eq('/productions');
			});

		});

		context('update action', () => {

			it('will be path comprised of pluralised model name and instance id', () => {
				productionStub.id = 1;
				const pageData = subject(productionStub, 'update');
				expect(pageData.formAction).to.eq('/productions/1');
			});

		});

	});

	describe('submitValue property', () => {

		context('create action', () => {

			it('will be comprised of action (\'Create\') and model name', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.submitValue).to.eq('Create production');
			});

		});

		context('update action', () => {

			it('will be comprised of action (\'Update\') and model name', () => {
				const pageData = subject(productionStub, 'update');
				expect(pageData.submitValue).to.eq('Update production');
			});

		});

	});

	describe('alertText property', () => {

		context('instance does not have errors', () => {

			context('create action', () => {

				it('will be path comprised of past tense of action (\'Create\') and instance title', () => {
					productionStub.title = 'Foo';
					const pageData = subject(productionStub, 'create');
					expect(pageData.alertText).to.eq('PRODUCTION CREATED: Foo');
				});

			});

			context('update action', () => {

				it('will be path comprised of past tense of action (\'Update\') and instance title', () => {
					productionStub.title = 'Foo';
					const pageData = subject(productionStub, 'update');
					expect(pageData.alertText).to.eq('PRODUCTION UPDATED: Foo');
				});

			});

			context('delete action', () => {

				it('will be path comprised of past tense of action (\'Delete\') and instance title', () => {
					productionStub.title = 'Foo';
					const pageData = subject(productionStub, 'delete');
					expect(pageData.alertText).to.eq('PRODUCTION DELETED: Foo');
				});

			});

		});

		context('instance has errors', () => {

			context('create action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					productionStub.errors = { title: [ 'Title is too short' ] };
					const pageData = subject(productionStub, 'create');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

			context('update action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					productionStub.errors = { title: [ 'Title is too short' ] };
					const pageData = subject(productionStub, 'update');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

			context('delete action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					productionStub.errors = { title: [ 'Title is too short' ] };
					const pageData = subject(productionStub, 'delete');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

		});

	});

	describe('alertType property', () => {

		context('instance does not have errors', () => {

			it('will be \'success\'', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.alertType).to.eq('success');
			});

		});

		context('instance has errors', () => {

			it('will be \'error\'', () => {
				productionStub.errors = { title: [ 'Title is too short' ] };
				const pageData = subject(productionStub, 'create');
				expect(pageData.alertType).to.eq('error');
			});

		});

	});

});
