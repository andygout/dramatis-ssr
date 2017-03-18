module.exports = modelName => {

	const responseInstance = {};

	return responseInstance[modelName] = {
		responseInstanceProperty: 'responseInstanceValue'
	};

};
