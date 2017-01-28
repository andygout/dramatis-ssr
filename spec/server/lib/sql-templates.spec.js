const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const Production = require('../../../server/models/production');
const Theatre = require('../../../server/models/theatre');

const stubs = {
	format: {
		literal: sinon.stub().returns('\'pgFormatValue\'')
	},
	Production: sinon.createStubInstance(Production),
	Theatre: sinon.createStubInstance(Theatre)
};

const resetStubs = () => {

	stubs.format.literal.reset();

};

beforeEach(function () {

	resetStubs();

});

const subject = proxyquire('../../../server/lib/sql-templates', {
	'pg-format': stubs.format
});

const removeWhitespace = string => string.replace(/\s\s+/g, ' ').trim();

describe('SQL Templates module', () => {

	describe('select method', () => {

		context('production model', () => {

			context('called within edit and show methods', () => {

				it('will return query that updates given instance', () => {
					const query = subject.select(stubs.Production, {
						selectCols: true,
						join: 'theatre',
						where: true,
						id: 'productions.id'
					});
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						SELECT
						productions.id,
						productions.title,
						theatres.id AS theatre_id,
						theatres.name AS theatre_name
						FROM productions
						INNER JOIN theatres ON theatre_id = theatres.id
						WHERE productions.id = 'pgFormatValue'
					`));
				});

			});

			context('called within list method', () => {

				it('will return query that updates given instance', () => {
					const query = subject.select(stubs.Production, {
						table: 'productions',
						selectCols: true,
						join: 'theatre',
						order: true
					});
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						SELECT
						productions.id,
						productions.title,
						theatres.id AS theatre_id,
						theatres.name AS theatre_name
						FROM productions
						INNER JOIN theatres ON theatre_id = theatres.id
						ORDER BY id ASC
					`));
				});

			});

		});

		context('theatre model', () => {

			context('called within edit and show (theatre data) methods', () => {

				it('will return query that updates given instance', () => {
					const query = subject.select(stubs.Theatre, { where: true });
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						SELECT *
						FROM theatres
						WHERE id = 'pgFormatValue'
					`));
				});

			});

			context('called within show method (production data)', () => {

				it('will return query that updates given instance', () => {
					const query = subject.select(stubs.Theatre, {
						table: 'productions',
						where: true,
						id: 'theatre_id'
					});
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						SELECT *
						FROM productions
						WHERE theatre_id = 'pgFormatValue'
					`));
				});

			});

			context('called within list method', () => {

				it('will return query that updates given instance', () => {
					const query = subject.select(stubs.Theatre, { table: 'theatres', order: true });
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						SELECT *
						FROM theatres
						ORDER BY id ASC
					`));
				});

			});

		});

	});

	describe('create method', () => {

		context('production model', () => {

			context('called within create method', () => {

				it('will return query that creates new entry', () => {
					const query = subject.create(stubs.Production, { title: '', theatre_id: '' });
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						INSERT INTO productions (title, theatre_id)
						VALUES ('pgFormatValue', 'pgFormatValue')
						RETURNING id
					`));
				});

			});

		});

	});

	describe('update method', () => {

		context('production model', () => {

			context('called within update method', () => {

				it('will return query that updates given instance', () => {
					const query = subject.update(stubs.Production, { title: '', theatre_id: '' });
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						UPDATE productions SET
						title = 'pgFormatValue',
						theatre_id = 'pgFormatValue'
						WHERE id = 'pgFormatValue'
						RETURNING id
					`));
				});

			});

		});

		context('theatre model', () => {

			context('called within update method', () => {

				it('will return query that updates given instance', () => {
					const query = subject.update(stubs.Theatre, { name: '' });
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						UPDATE theatres SET
						name = 'pgFormatValue'
						WHERE id = 'pgFormatValue'
						RETURNING id
					`));
				});

			});

		});

	});

	describe('delete method', () => {

		context('production model', () => {

			context('called within delete method', () => {

				it('will return query that deletes given instance', () => {
					const query = subject.delete(stubs.Production);
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						DELETE FROM productions
						WHERE id = 'pgFormatValue'
						RETURNING title
					`));
				});

			});

		});

		context('theatre model', () => {

			context('called within delete method', () => {

				it('will return query that deletes given instance', () => {
					const query = subject.delete(stubs.Theatre);
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						DELETE FROM theatres
						WHERE id = 'pgFormatValue'
						RETURNING name
					`));
				});

			});

		});

	});

	describe('createIfNotExists method', () => {

		context('theatre model', () => {

			context('called within create method', () => {

				it('will return query that creates new entry if given unique value does not exist', () => {
					const query = subject.createIfNotExists(stubs.Theatre);
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						WITH
						i AS (
							INSERT INTO theatres (name)
							SELECT 'pgFormatValue'
							WHERE NOT EXISTS (
								SELECT id
								FROM theatres
								WHERE name = 'pgFormatValue'
							)
							RETURNING id
						),
						s AS (
							SELECT id
							FROM theatres
							WHERE name = 'pgFormatValue'
						)
						SELECT id
						FROM i
						UNION ALL
						SELECT id
						FROM s
					`));
				});

			});

		});

	});

	describe('checkIfExists method', () => {

		context('theatre model', () => {

			context('called within validateUpdateInDb method', () => {

				it('will return query that checks if row with same chosen field but different ID exists', () => {
					const query = subject.checkIfExists(stubs.Theatre);
					expect(removeWhitespace(query)).to.eq(removeWhitespace(`
						SELECT 1
						FROM theatres
						WHERE name = 'pgFormatValue'
						AND id != 'pgFormatValue'
					`));
				});

			});

		});

	});

});
