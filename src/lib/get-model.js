import { singularise } from './strings';
import { ROUTE_TO_PLURALISED_MODEL_MAP, ROUTE_TO_MODEL_MAP } from '../utils/constants';

const getModelFromRoute = route => ROUTE_TO_MODEL_MAP[route] || singularise(route);

const getPluralisedModelFromRoute = route => ROUTE_TO_PLURALISED_MODEL_MAP[route] || route;

export {
	getModelFromRoute,
	getPluralisedModelFromRoute
};
