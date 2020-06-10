import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import { capitalise } from '../lib/strings';
import { instancePages } from '../pages';
import { singularise } from '../lib/strings';

export default async (request, response, next) => {

	const apiPath = request.path;

	try {

		const instance = await fetchFromApi(apiPath);

		const pluralisedModel = request.path.split('/')[1];

		const model = singularise(pluralisedModel);

		const title = instance.name;

		const props = {
			documentTitle: `${title} (${model})`,
			pageTitle: title,
			[model]: instance
		};

		const PageComponent = instancePages[capitalise(model)];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

}
