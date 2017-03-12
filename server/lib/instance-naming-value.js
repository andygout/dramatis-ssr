import modelNamingPropMap from '../config/model-naming-prop-map';

export default instance => {

	const model = instance.model;

	return instance[modelNamingPropMap[model]];

};
