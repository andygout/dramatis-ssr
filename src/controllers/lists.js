import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import { listPages } from '../pages';
import {
	PLURALISED_MODEL_TO_PAGE_COMPONENT_MAP,
	PLURALISED_MODEL_TO_PROP_NAME_MAP,
	PLURALISED_MODEL_TO_TITLE_MAP
} from '../utils/constants';

export default async (request, response, next, pluralisedModel) => {

	const apiPath = request.path;

	try {

		const list = await fetchFromApi(apiPath);

		const title = PLURALISED_MODEL_TO_TITLE_MAP[pluralisedModel];

		const props = {
			documentTitle: title,
			pageTitle: title,
			[PLURALISED_MODEL_TO_PROP_NAME_MAP[pluralisedModel]]: list
		};

		const PageComponent = listPages[PLURALISED_MODEL_TO_PAGE_COMPONENT_MAP[pluralisedModel]];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

};
