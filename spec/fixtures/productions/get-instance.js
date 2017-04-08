module.exports = (opts = {}) => {

	return {
		model: 'production',
		uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		theatre: {
			name: 'Almeida Theatre'
		},
		person: {
			name: 'Patrick Stewart'
		},
		hasError: opts.hasError || false
	};

};
