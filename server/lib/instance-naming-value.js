import modelNamingPropMap from './model-naming-prop-map';

export default instance => {

	const model = instance.model.toLowerCase();

	return instance[modelNamingPropMap[model]];

};
