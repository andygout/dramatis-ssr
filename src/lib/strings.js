import {
	IRREGULAR_PLURAL_NOUNS_MAP,
	IRREGULAR_SINGULAR_NOUNS_MAP
} from '../utils/constants';

const capitalise = string => string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();

const pascalCasify = string => string.charAt(0).toUpperCase() + string.substring(1);

const pluralise = model => IRREGULAR_PLURAL_NOUNS_MAP[model] || `${model}s`;

const singularise = pluralisedModel => IRREGULAR_SINGULAR_NOUNS_MAP[pluralisedModel] || pluralisedModel.slice(0, -1);

export {
	capitalise,
	pascalCasify,
	pluralise,
	singularise
};
