import listedNamingProps from '../config/listed-naming-props';

export default model => listedNamingProps[model] || 'name';
