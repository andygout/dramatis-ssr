import modelNamingPropMap from '../model-naming-prop-map';

export default function (instance) {

	const model = instance.constructor.name.toLowerCase();

	return instance[modelNamingPropMap[model]];

};
