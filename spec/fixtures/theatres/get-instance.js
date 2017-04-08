module.exports = (opts = {}) => {

	return {
		model: 'theatre',
		uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		errors: opts.errorsAssociations || {},
		hasError: opts.hasError || false
	};

};
