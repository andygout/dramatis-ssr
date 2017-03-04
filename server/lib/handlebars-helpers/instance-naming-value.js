import modelNamingPropMap from '../model-naming-prop-map';

export default instance => {

	const model = instance.constructor.name.toLowerCase();

	return instance[modelNamingPropMap[model]];

};
