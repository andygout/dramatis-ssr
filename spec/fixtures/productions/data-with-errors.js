module.exports = function (method) {

	return {
		page: {
			title: '',
			modelName: 'production',
			modelRoute: 'productions',
			instanceRoute: '/productions/1',
			action: method
		},
		production: {
			id: 1,
			hasError: true
		}
	};

};
