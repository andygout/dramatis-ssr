exports.up = function(db, done) {
	db.createTable('productions', {
		id: {
			type: 'int',
			primaryKey: 'true',
			autoIncrement: true
		},
		title: {
			type: 'string',
			length: 255,
			notNull: true
		},
		theatre_id: {
			type: 'int',
			notNull: true,
			foreignKey: {
				name: 'productions_theatres_fk',
				table: 'theatres',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT'
				},
				mapping: {
					theatre_id: 'id'
				}
			}
		}
	}, done)
};

exports.down = function(db, done) {
	db.dropTable('productions', done)
};
