module.exports = function (method) {

	return {
		page: {
			title: '',
			modelName: 'production',
			action: method
		},
		production: {
			id: 1,
			hasError: true
		}
	};

};
