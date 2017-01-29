module.exports = function (method) {

	return {
		page: {
			title: '',
			modelName: 'theatre',
			modelRoute: 'theatres',
			instanceRoute: '/theatres/1',
			action: method
		},
		theatre: {
			id: 1,
			hasError: true
		}
	};

};
