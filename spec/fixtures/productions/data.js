module.exports = function (method) {

	return {
		page: {
			title: 'Hamlet',
			modelName: 'production',
			modelRoute: 'productions',
			instanceRoute: '/productions/1',
			action: method
		},
		production: {
			id: 1
		}
	};

};
