module.exports = function (method) {

	return {
		page: {
			title: 'Hamlet',
			modelName: 'production',
			action: method
		},
		production: {
			id: 1
		}
	};

};
