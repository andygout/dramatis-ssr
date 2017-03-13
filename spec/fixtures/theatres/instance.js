module.exports = (opts = {}) => {

	return {
		model: 'theatre',
		name: 'Almeida Theatre',
		errors: opts.errorsAssociations || {},
		hasError: opts.hasError || false
	};

};
