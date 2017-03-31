module.exports = modelName => {

	const responseInstance = {};

	responseInstance[modelName] = { responseInstanceProperty: 'responseInstanceValue' };

	return responseInstance;

};
