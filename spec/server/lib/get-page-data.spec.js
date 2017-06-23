const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const getProductionInstanceFixture = require('../../fixtures/productions/get-instance');
const getTheatreInstanceFixture = require('../../fixtures/theatres/get-instance');

const sandbox = sinon.sandbox.create();

let stubs;
let subject;
let productionInstance;
let theatreInstance;

beforeEach(() => {

	productionInstance = getProductionInstanceFixture();
	theatreInstance = getTheatreInstanceFixture();

	stubs = {
		capitalise: sandbox.stub().returns('Productions'),
		pluralise: sandbox.stub().returns('productions')
	};

	subject = createSubject();

});

afterEach(() => {

	sandbox.restore();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/lib/get-page-data', {
		'./capitalise': stubOverrides.capitalise || stubs.capitalise,
		'./pluralise': stubs.pluralise
	});

describe('Get Page Data module', () => {

	describe('object properties', () => {

		context('create action', () => {

			it('will contain properties: documentTitle, title, formAction + submitValue', () => {

				const pageData = subject(productionInstance, 'create');
				expect(pageData).to.have.property('documentTitle');
				expect(pageData).to.have.property('title');
				expect(pageData).to.have.property('model');
				expect(pageData).to.have.property('formAction');
				expect(pageData).to.have.property('submitValue');

			});

		});

		context('update action', () => {

			it('will contain properties: documentTitle, title, formAction + submitValue', () => {

				const pageData = subject(productionInstance, 'update');
				expect(pageData).to.have.property('documentTitle');
				expect(pageData).to.have.property('title');
				expect(pageData).to.have.property('model');
				expect(pageData).to.have.property('formAction');
				expect(pageData).to.have.property('submitValue');

			});

		});

		context('show action', () => {

			it('will contain properties: documentTitle, title + model', () => {

				const pageData = subject(productionInstance, 'show');
				expect(pageData).to.have.property('documentTitle');
				expect(pageData).to.have.property('title');
				expect(pageData).to.have.property('model');
				expect(pageData).not.to.have.property('formAction');
				expect(pageData).not.to.have.property('submitValue');

			});

		});

		context('list action', () => {

			it('will contain properties: documentTitle + title', () => {

				const pageData = subject(productionInstance, 'list');
				expect(pageData).to.have.property('documentTitle');
				expect(pageData).to.have.property('title');
				expect(pageData).not.to.have.property('model');
				expect(pageData).not.to.have.property('formAction');
				expect(pageData).not.to.have.property('submitValue');

			});

		});

	});

	describe('documentTitle property', () => {

		context('create action', () => {

			it('will read \'New <model>\'', () => {

				const pageData = subject(productionInstance, 'create');
				expect(pageData.documentTitle).to.eq('New production');

			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will prioritise use of documentTitle property over generated value', () => {

					productionInstance.documentTitle = 'Edit: Macbeth (Hampstead Theatre) (production)';
					const pageData = subject(productionInstance, 'update');
					expect(pageData.documentTitle).to.eq('Edit: Macbeth (Hampstead Theatre) (production)');

				});

				it('will generate text \'Edit: <instance> (<theatre name>) (<model>)\' when documentTitle absent', () => {

					const pageData = subject(productionInstance, 'update');
					expect(pageData.documentTitle).to.eq('Edit: Hamlet (Almeida Theatre) (production)');

				});

			});

			context('theatre instance', () => {

				it('will prioritise use of documentTitle property over generated value', () => {

					theatreInstance.documentTitle = 'Edit: Hampstead Theatre (theatre)';
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.documentTitle).to.eq('Edit: Hampstead Theatre (theatre)');

				});

				it('will generate text \'Edit: <instance> (<model>)\' when documentTitle absent', () => {

					const pageData = subject(theatreInstance, 'update');
					expect(pageData.documentTitle).to.eq('Edit: Almeida Theatre (theatre)');

				});

			});

		});

		context('show action', () => {

			context('production instance', () => {

				it('will read \'<instance> (<theatre name>) (<model>)\'', () => {

					const pageData = subject(productionInstance, 'show');
					expect(pageData.documentTitle).to.eq('Hamlet (Almeida Theatre) (production)');

				});

			});

			context('theatre instance', () => {

				it('will read \'<instance> (<model>)\'', () => {

					const pageData = subject(theatreInstance, 'show');
					expect(pageData.documentTitle).to.eq('Almeida Theatre (theatre)');

				});

			});

		});

		context('list action', () => {

			context('productions instances', () => {

				it('will read \'Home \'', () => {

					const pageData = subject([], 'list', { pluralisedModel: 'productions' });
					expect(pageData.documentTitle).to.eq('Home');

				});

			});

			context('theatres instances', () => {

				it('will read \'<models>\'', () => {

					subject = createSubject({ capitalise: sinon.stub().returns('Theatres') });
					const pageData = subject([], 'list', { pluralisedModel: 'theatres' });
					expect(pageData.documentTitle).to.eq('Theatres');

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

			it('will prioritise use of pageTitle property over title property', () => {

				productionInstance.pageTitle = 'Macbeth';
				const pageData = subject(productionInstance, 'update');
				expect(pageData.title).to.eq('Macbeth');

			});

			it('will assign name value of instance if pageTitle absent', () => {

				productionInstance.pageTitle = undefined;
				const pageData = subject(productionInstance, 'update');
				expect(pageData.title).to.eq('Hamlet');

			});

		});

		context('show action', () => {

			it('will assign name value of instance', () => {

				const pageData = subject(productionInstance, 'show');
				expect(pageData.title).to.eq('Hamlet');

			});

		});

		context('list action', () => {

			it('will use capitalised pluralised model value provided', () => {

				const pageData = subject([], 'list', { pluralisedModel: 'productions' });
				expect(stubs.capitalise.calledOnce).to.be.true;
				expect(stubs.capitalise.calledWithExactly('productions')).to.be.true;
				expect(pageData.title).to.eq('Productions');

			});

		});

	});

	describe('model property', () => {

		for (let action of ['create', 'update', 'show']) {

			context(`${action} action`, () => {

				it('will be the model of the instance', () => {

					const pageData = subject(productionInstance, action);
					expect(pageData.model).to.eq('production');

				});

			});

		}

	});

	describe('formAction property', () => {

		context('create action', () => {

			it('will be path comprised of pluralised model name', () => {

				const pageData = subject(productionInstance, 'create');
				expect(stubs.pluralise.calledOnce).to.be.true;
				expect(stubs.pluralise.calledWithExactly(productionInstance.model)).to.be.true;
				expect(pageData.formAction).to.eq('/productions');

			});

		});

		context('update action', () => {

			it('will be path comprised of pluralised model name and instance uuid', () => {

				const pageData = subject(productionInstance, 'update');
				expect(stubs.pluralise.calledOnce).to.be.true;
				expect(stubs.pluralise.calledWithExactly(productionInstance.model)).to.be.true;
				expect(pageData.formAction).to.eq('/productions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

			});

		});

	});

	describe('submitValue property', () => {

		context('create action', () => {

			it('will be comprised of action (\'Create\') and model name', () => {

				const capitaliseStub = sinon.stub().returns('Create');
				subject = createSubject({ capitalise: capitaliseStub });
				const pageData = subject(productionInstance, 'create');
				expect(capitaliseStub.calledOnce).to.be.true;
				expect(capitaliseStub.calledWithExactly('create')).to.be.true;
				expect(pageData.submitValue).to.eq('Create production');

			});

		});

		context('update action', () => {

			it('will be comprised of action (\'Update\') and model name', () => {

				const capitaliseStub = sinon.stub().returns('Update');
				subject = createSubject({ capitalise: capitaliseStub });
				const pageData = subject(productionInstance, 'update');
				expect(capitaliseStub.calledOnce).to.be.true;
				expect(capitaliseStub.calledWithExactly('update')).to.be.true;
				expect(pageData.submitValue).to.eq('Update production');

			});

		});

	});

});
