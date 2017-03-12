module.exports = (opts = {}) => {

	return {
		model: 'Theatre',
		hasError: opts.hasError || false,
		errors: opts.errorsAssociations || {}
	};

};
