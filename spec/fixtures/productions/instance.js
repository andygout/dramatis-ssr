module.exports = (opts = {}) => {

	return {
		production: {
			title: 'Hamlet',
			theatre: {
				name: 'Almeida Theatre'
			},
			hasError: opts.hasError || false
		}
	};


};
