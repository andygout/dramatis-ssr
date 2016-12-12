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
		}
	}, done)
};

exports.down = function(db, done) {
	db.dropTable('productions', done)
};
