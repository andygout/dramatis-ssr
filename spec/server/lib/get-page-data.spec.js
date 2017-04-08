const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const getProductionInstanceFixture = require('../../fixtures/productions/get-instance');
const getTheatreInstanceFixture = require('../../fixtures/theatres/get-instance');

let productionInstance;
let theatreInstance;

const resetInstances = () => {

	productionInstance = getProductionInstanceFixture();
	theatreInstance = getTheatreInstanceFixture();

};

const stubs = {
	capitalise: sinon.stub().returns('Productions'),
	instanceNamingValue: sinon.stub().returns('Hamlet'),
	pluralise: sinon.stub().returns('productions')
};

const resetStubs = () => {

	stubs.capitalise.reset();
	stubs.instanceNamingValue.reset();
	stubs.pluralise.reset();

};

beforeEach(() => {

	resetInstances();
	resetStubs();

});

const createSubject = (stubOverrides = {}) =>
	proxyquire('../../../dist/lib/get-page-data', {
		'./capitalise': stubOverrides.capitalise || stubs.capitalise,
		'./instance-naming-value': stubOverrides.instanceNamingValue || stubs.instanceNamingValue,
		'./pluralise': stubs.pluralise
	});

describe('Get Page Data module', () => {

	describe('object properties', () => {

		context('create action', () => {

			it('will contain properties: documentTitle, title, formAction + submitValue', () => {

				const subject = createSubject();
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

				const subject = createSubject();
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

				const subject = createSubject();
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

				const subject = createSubject();
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

			it('will read \' | New <model>\'', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'create');
				expect(pageData.documentTitle).to.eq(' | New production');

			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will prioritise use of documentTitle property over generated value', () => {

					const subject = createSubject();
					productionInstance.documentTitle = ' | Edit: Macbeth (Hampstead Theatre) (production)';
					const pageData = subject(productionInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Macbeth (Hampstead Theatre) (production)');

				});

				it('will generate text \' | Edit: <instance> (<theatre name>) (<model>)\' when documentTitle absent', () => {

					const subject = createSubject();
					const pageData = subject(productionInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Hamlet (Almeida Theatre) (production)');

				});

			});

			context('theatre instance', () => {

				it('will prioritise use of documentTitle property over generated value', () => {

					const subject = createSubject();
					theatreInstance.documentTitle = ' | Edit: Hampstead Theatre (theatre)';
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Hampstead Theatre (theatre)');

				});

				it('will generate text \' | Edit: <instance> (<model>)\' when documentTitle absent', () => {

					const subject = createSubject({ instanceNamingValue: sinon.stub().returns('Almeida Theatre') });
					const pageData = subject(theatreInstance, 'update');
					expect(pageData.documentTitle).to.eq(' | Edit: Almeida Theatre (theatre)');

				});

			});

		});

		context('show action', () => {

			context('production instance', () => {

				it('will read \' | <instance> (<theatre name>) (<model>)\'', () => {

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

		context('list action', () => {

			context('productions instances', () => {

				it('will read \' | Home \'', () => {

					const subject = createSubject();
					const pageData = subject([], 'list', { pluralisedModel: 'productions' });
					expect(pageData.documentTitle).to.eq(' | Home');

				});

			});

			context('theatres instances', () => {

				it('will read \' | <models>\'', () => {

					const subject = createSubject({ capitalise: sinon.stub().returns('Theatres') });
					const pageData = subject([], 'list', { pluralisedModel: 'theatres' });
					expect(pageData.documentTitle).to.eq(' | Theatres');

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
					expect(stubs.instanceNamingValue.notCalled).to.be.true;
					expect(pageData.title).to.eq('Macbeth');

				});

				it('will assign naming value of instance (title) pageTitle absent', () => {

					const subject = createSubject();
					productionInstance.pageTitle = undefined;
					const pageData = subject(productionInstance, 'update');
					expect(stubs.instanceNamingValue.calledOnce).to.be.true;
					expect(stubs.instanceNamingValue.calledWithExactly(productionInstance)).to.be.true;
					expect(pageData.title).to.eq('Hamlet');

				});

			});

			context('theatre instance', () => {

				it('will prioritise use of pageTitle property over name property', () => {

					const subject = createSubject({ instanceNamingValue: sinon.stub().returns('Almeida Theatre') });
					theatreInstance.pageTitle = 'Hampstead Theatre';
					const pageData = subject(theatreInstance, 'update');
					expect(stubs.instanceNamingValue.notCalled).to.be.true;
					expect(pageData.title).to.eq('Hampstead Theatre');

				});

				it('will assign naming value of instance (name) when pageTitle absent', () => {

					const instanceNamingValueStub = sinon.stub().returns('Almeida Theatre');
					const subject = createSubject({ instanceNamingValue: instanceNamingValueStub });
					theatreInstance.pageTitle = undefined;
					const pageData = subject(theatreInstance, 'update');
					expect(instanceNamingValueStub.calledOnce).to.be.true;
					expect(instanceNamingValueStub.calledWithExactly(theatreInstance)).to.be.true;
					expect(pageData.title).to.eq('Almeida Theatre');

				});

			});

		});

		context('show action', () => {

			context('production instance', () => {

				it('will assign naming value of instance', () => {

					const subject = createSubject();
					const pageData = subject(productionInstance, 'show');
					expect(stubs.instanceNamingValue.calledOnce).to.be.true;
					expect(stubs.instanceNamingValue.calledWithExactly(productionInstance)).to.be.true;
					expect(pageData.title).to.eq('Hamlet');

				});

			});

		});

		context('list action', () => {

			it('will use capitalised pluralised model value provided', () => {

				const subject = createSubject();
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

				context('production instance', () => {

					it('will be the model of the instance', () => {

						const subject = createSubject();
						const pageData = subject(productionInstance, action);
						expect(pageData.model).to.eq('production');

					});

				});

			});

		}

	});

	describe('formAction property', () => {

		context('create action', () => {

			it('will be path comprised of pluralised model name', () => {

				const subject = createSubject();
				const pageData = subject(productionInstance, 'create');
				expect(stubs.pluralise.calledOnce).to.be.true;
				expect(stubs.pluralise.calledWithExactly(productionInstance.model)).to.be.true;
				expect(pageData.formAction).to.eq('/productions');

			});

		});

		context('update action', () => {

			it('will be path comprised of pluralised model name and instance uuid', () => {

				const subject = createSubject();
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
				const subject = createSubject({ capitalise: capitaliseStub });
				const pageData = subject(productionInstance, 'create');
				expect(capitaliseStub.calledOnce).to.be.true;
				expect(capitaliseStub.calledWithExactly('create')).to.be.true;
				expect(pageData.submitValue).to.eq('Create production');

			});

		});

		context('update action', () => {

			it('will be comprised of action (\'Update\') and model name', () => {

				const capitaliseStub = sinon.stub().returns('Update');
				const subject = createSubject({ capitalise: capitaliseStub });
				const pageData = subject(productionInstance, 'update');
				expect(capitaliseStub.calledOnce).to.be.true;
				expect(capitaliseStub.calledWithExactly('update')).to.be.true;
				expect(pageData.submitValue).to.eq('Update production');

			});

		});

	});

});
