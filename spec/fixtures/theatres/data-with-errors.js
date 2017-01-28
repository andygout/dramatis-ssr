module.exports = function (method) {

	return {
		page: {
			title: '',
			modelName: 'theatre',
			action: method
		},
		theatre: {
			id: 1,
			hasError: true
		}
	};

};
