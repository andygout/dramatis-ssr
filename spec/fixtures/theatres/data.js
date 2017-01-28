module.exports = function (method) {

	return {
		page: {
			title: 'Almeida Theatre',
			modelName: 'theatre',
			action: method
		},
		theatre: {
			id: 1
		}
	};

};
