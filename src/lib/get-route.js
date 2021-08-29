import { pluralise } from './strings';
import { MODEL_TO_ROUTE_MAP } from '../utils/constants';

const getRouteFromModel = model =>
	MODEL_TO_ROUTE_MAP[model] || pluralise(model);

export {
	getRouteFromModel
};
