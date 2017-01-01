const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-as-promised');

const Theatre = require('../../../server/models/theatre');

const dataFixture = require('../../fixtures/theatres/data');
const dataWithErrorsFixture = require('../../fixtures/theatres/data-with-errors');
const dataListFixture = require('../../fixtures/theatres/data-list');
const alertFixture = require('../../fixtures/alert');

const err = new Error('errorText');

const alertStub = sinon.stub().returns('alertStub');

const resetStubs = () => {
	alertStub.reset();
};

beforeEach(function() {
	resetStubs();
});

describe('Theatre controller', () => {

	let method;
	let methodStub;
	let request;
	let response;
	let next;

	function createSubject (method, TheatreStub) {
		return proxyquire(`../../../server/controllers/theatres/${method}`, {
			'../../models/theatre': TheatreStub
		});
	}

	function createInstance (method, methodStub) {
		request = httpMocks.createRequest({ flash: alertStub });
		response = httpMocks.createResponse();
		next = sinon.stub();

		const TheatreStub = (method !== 'list') ?
			function () { this[method] = methodStub; } :
			sinon.stub(Theatre, 'list', function () { return methodStub });

		const subject = createSubject(method, TheatreStub);
		return subject(request, response, next);
	}

	describe('new method', () => {

		beforeEach(function() {
			method = 'new';
		});

		it('will return status code 200 (OK)', () => {
			methodStub = sinon.stub().returns(dataFixture);
			createInstance(method, methodStub);
			expect(response.statusCode).to.eq(200);
			expect(response._getRenderData()).to.deep.eq(dataFixture);
		});

	});

	describe('create method', () => {

		beforeEach(function() {
			method = 'create';
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect)', done => {
				methodStub = sinon.stub().resolves(dataFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRenderData()).to.deep.eq({});
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(dataWithErrorsFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderData()).to.deep.eq(Object.assign(dataWithErrorsFixture, alertFixture));
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('edit method', () => {

		beforeEach(function() {
			method = 'edit';
		});

		context('resolves with data', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(dataFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderData()).to.deep.eq(dataFixture);
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('update method', () => {

		beforeEach(function() {
			method = 'update';
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect)', done => {
				methodStub = sinon.stub().resolves(dataFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRenderData()).to.deep.eq({});
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(dataWithErrorsFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderData()).to.deep.eq(Object.assign(dataWithErrorsFixture, alertFixture));
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('delete method', () => {

		beforeEach(function() {
			method = 'delete';
		});

		context('resolves with data with no model errors', () => {

			it('will return status code 302 (redirect)', done => {
				methodStub = sinon.stub().resolves(dataFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.eq(302);
					expect(response._getRenderData()).to.deep.eq({});
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with data with model errors', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(dataWithErrorsFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderData()).to.deep.eq(Object.assign(dataWithErrorsFixture, alertFixture));
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('show method', () => {

		beforeEach(function() {
			method = 'show';
		});

		context('resolves with data', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = sinon.stub().resolves(dataFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderData()).to.deep.eq(Object.assign(dataFixture, alertFixture));
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = sinon.stub().rejects(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

	describe('list method', () => {

		beforeEach(function() {
			method = 'list';
		});

		afterEach(function() {
			Theatre.list.restore();
		});

		context('resolves with data', () => {

			it('will return status code 200 (OK)', done => {
				methodStub = Promise.resolve(dataListFixture);
				createInstance(method, methodStub).then(() => {
					expect(response.statusCode).to.equal(200);
					expect(response._getRenderData()).to.deep.eq(Object.assign(dataListFixture, alertFixture));
					expect(next.notCalled).to.be.true;
					done();
				});
			});

		});

		context('resolves with error', () => {

			it('will call next() with error', done => {
				methodStub = Promise.reject(err);
				createInstance(method, methodStub).then(() => {
					expect(next.calledOnce).to.be.true;
					expect(next.calledWithExactly(err)).to.be.true;
					done();
				});
			});

		});

	});

});
