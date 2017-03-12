module.exports = (opts = {}) => {

	return {
		model: 'Production',
		uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		title: 'Hamlet',
		theatre: {
			name: 'Almeida Theatre'
		},
		errors: {},
		hasError: opts.hasError || false
	};

};
