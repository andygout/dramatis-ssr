module.exports = (opts = {}) => {

	return {
		model: 'Theatre',
		name: 'Almeida Theatre',
		errors: opts.errorsAssociations || {},
		hasError: opts.hasError || false
	};

};
