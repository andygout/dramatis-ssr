module.exports = pluralisedModelName => {

	const responseInstancesList = {};

	return responseInstancesList[pluralisedModelName] = [
		{
			responseInstancesListProperty: 'responseInstancesListValue'
		}
	];

};
