import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import getDifferentiatorSuffix from '../lib/get-differentiator-suffix';
import { getModelFromRoute } from '../lib/get-model';
import { pascalCasify } from '../lib/strings';
import { instancePages } from '../pages';

export default async (request, response, next) => {

	const apiPath = request.path;

	try {

		const instance = await fetchFromApi(apiPath);

		const { name, differentiator } = instance;

		const modelRoute =
			request.route.path.split('/')
				.filter(routeComponent => routeComponent !== ':uuid')
				.filter(Boolean)
				.join('/');

		const model = getModelFromRoute(modelRoute);

		let documentTitle = `${name} (${model})`;

		let pageTitle = name;

		if (differentiator) {

			const differentiatorSuffix = getDifferentiatorSuffix(differentiator);

			documentTitle += differentiatorSuffix;

			pageTitle += differentiatorSuffix;

		}

		const props = {
			documentTitle,
			pageTitle,
			[model]: instance
		};

		const PageComponent = instancePages[pascalCasify(model)];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

};
