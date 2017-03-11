const expect = require('chai').expect;

let productionInstance;
let theatreInstance;

const resetInstances = () => {

	productionInstance = {
		uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		model: 'Production',
		title: 'Hamlet',
		theatre: {
			name: 'Almeida Theatre'
		},
		errors: {},
		hasError: false
	};

	theatreInstance = {
		model: 'Theatre',
		name: 'Almeida Theatre',
		errors: {},
		hasError: false
	}

};

const subject = require('../../../dist/lib/get-page-data');

beforeEach(() => {

	resetInstances();

});

describe('Get Page Data module', () => {

	describe('documentTitle property', () => {

		context('create action', () => {

			it('will read \' | New <model>\'', () => {
				const pageData = subject(productionInstance, 'create');
				expect(pageData.documentTitle).to.eq(' | New production');
			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will read \' | Edit: <instance> (<theatre name>) (<model>)\'', () => {
					const pageData = subject(productionInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Hamlet (Almeida Theatre) (production)');
				});

			});

			context('theatre instance', () => {

				it('will read \' | Edit: <instance> (<model>)\'', () => {
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Almeida Theatre (theatre)');
				});

			});

		});

		context('show action', () => {

			context('production instance', () => {

				it('will read \' | <instance> (<theatre name>) (<model>)\'', () => {
					const pageData = subject(productionInstance, 'show');
					expect(pageData.documentTitle).to.eq(' | Hamlet (Almeida Theatre) (production)');
				});

			});

			context('theatre instance', () => {

				it('will read \' | <instance> (<model>)\'', () => {
					const pageData = subject(theatreInstance, 'show');
					expect(pageData.documentTitle).to.eq(' | Almeida Theatre (theatre)');
				});

			});

		});

	});

	describe('title property', () => {

		context('create action', () => {

			it('will read \'New <model>\'', () => {
				const pageData = subject(productionInstance, 'create');
				expect(pageData.title).to.eq('New production');
			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will prioritise use of pageTitleText over title', () => {
					productionInstance.pageTitleText = 'Macbeth';
					const pageData = subject(productionInstance, 'update');
					expect(pageData.title).to.eq('Macbeth');
				});

				it('will use title when pageTitleText absent', () => {
					productionInstance.pageTitleText = undefined;
					const pageData = subject(productionInstance, 'update');
					expect(pageData.title).to.eq('Hamlet');
				});

			});

			context('theatre instance', () => {

				it('will prioritise use of pageTitleText over name', () => {
					theatreInstance.pageTitleText = 'Hampstead Theatre';
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.title).to.eq('Hampstead Theatre');
				});

				it('will use name when pageTitleText absent', () => {
					theatreInstance.pageTitleText = undefined;
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.title).to.eq('Almeida Theatre');
				});

			});

		});

	});

	describe('formAction property', () => {

		context('create action', () => {

			it('will be path comprised of pluralised model name', () => {
				const pageData = subject(productionInstance, 'create');
				expect(pageData.formAction).to.eq('/productions');
			});

		});

		context('update action', () => {

			it('will be path comprised of pluralised model name and instance uuid', () => {
				const pageData = subject(productionInstance, 'update');
				expect(pageData.formAction).to.eq('/productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
			});

		});

	});

	describe('submitValue property', () => {

		context('create action', () => {

			it('will be comprised of action (\'Create\') and model name', () => {
				const pageData = subject(productionInstance, 'create');
				expect(pageData.submitValue).to.eq('Create production');
			});

		});

		context('update action', () => {

			it('will be comprised of action (\'Update\') and model name', () => {
				const pageData = subject(productionInstance, 'update');
				expect(pageData.submitValue).to.eq('Update production');
			});

		});

	});

});
