module.exports = function (method) {

	return {
		page: {
			title: 'Almeida Theatre',
			modelName: 'theatre',
			modelRoute: 'theatres',
			instanceRoute: '/theatres/1',
			action: method
		},
		theatre: {
			id: 1
		}
	};

};
