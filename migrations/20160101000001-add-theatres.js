exports.up = function(db, done) {

	db.createTable('theatres', {
		id: {
			type: 'int',
			primaryKey: 'true',
			autoIncrement: true
		},
		name: {
			type: 'string',
			length: 255,
			notNull: true,
			unique: true
		}
	}, done)

};

exports.down = function(db, done) {

	db.dropTable('theatres', done)

};
