module.exports = pluralisedModelName => {

	const responseInstancesList = {};

	responseInstancesList[pluralisedModelName] = [
		{
			responseInstancesListProperty: 'responseInstancesListValue'
		}
	];

	return responseInstancesList;

};
