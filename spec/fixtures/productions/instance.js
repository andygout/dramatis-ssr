module.exports = (opts = {}) => {

	return {
		production: {
			model: 'Production',
			uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
			title: 'Hamlet',
			theatre: {
				name: 'Almeida Theatre'
			},
			hasError: opts.hasError || false
		}
	};


};
