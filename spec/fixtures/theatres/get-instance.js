module.exports = (opts = {}) => {

	return {
		model: 'theatre',
		errors: opts.errorsAssociations || {},
		hasError: opts.hasError || false
	};

};
