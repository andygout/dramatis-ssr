import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import { capitalise } from '../lib/strings';
import { instancePages } from '../pages';
import { IRREGULAR_SINGULAR_NOUNS_MAP } from '../utils/constants';

function getSingularFormOfModel (pluralisedModel) {

	return IRREGULAR_SINGULAR_NOUNS_MAP[pluralisedModel] || pluralisedModel.slice(0, -1);

}

export default async function (request, response, next) {

	const apiPath = request.path;

	try {

		const instance = await fetchFromApi(apiPath);

		const pluralisedModel = request.path.split('/')[1];

		const model = getSingularFormOfModel(pluralisedModel);

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
