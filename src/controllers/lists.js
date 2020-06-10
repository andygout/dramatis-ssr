import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import { capitalise } from '../lib/strings';
import { listPages } from '../pages';

export default async (request, response, next) => {

	const apiPath = request.path;

	try {

		const list = await fetchFromApi(apiPath);

		const pluralisedModel = request.path.split('/')[1];

		const title = capitalise(pluralisedModel);

		const props = {
			documentTitle: title,
			pageTitle: title,
			[pluralisedModel]: list
		};

		const PageComponent = listPages[capitalise(pluralisedModel)];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

}
