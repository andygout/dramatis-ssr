import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import { getPluralisedModelFromRoute } from '../lib/get-model';
import { pascalCasify } from '../lib/strings';
import { listPages } from '../pages';

export default async (request, response, next) => {

	const apiPath = request.path;

	try {

		const list = await fetchFromApi(apiPath);

		const modelRoute =
			request.route.path.split('/')
				.filter(routeComponent => routeComponent !== ':uuid')
				.filter(Boolean)
				.join('/');

		const pluralisedModel = getPluralisedModelFromRoute(modelRoute);

		const title = pascalCasify(pluralisedModel);

		const props = {
			documentTitle: title,
			pageTitle: title,
			[pluralisedModel]: list
		};

		const PageComponent = listPages[pascalCasify(pluralisedModel)];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

};
