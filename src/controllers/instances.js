import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import getDifferentiatorSuffix from '../lib/get-differentiator-suffix';
import { instancePages } from '../pages';
import { MODEL_TO_DISPLAY_NAME_MAP, MODEL_TO_PAGE_COMPONENT_MAP, MODEL_TO_PROP_NAME_MAP } from '../utils/constants';

export default async (request, response, next, model) => {

	const apiPath = request.path;

	try {

		const instance = await fetchFromApi(apiPath);

		const { name, differentiator } = instance;

		let documentTitle = `${name} (${MODEL_TO_DISPLAY_NAME_MAP[model]})`;

		let pageTitle = name;

		if (differentiator) {

			const differentiatorSuffix = getDifferentiatorSuffix(differentiator);

			documentTitle += differentiatorSuffix;

			pageTitle += differentiatorSuffix;

		}

		const props = {
			documentTitle,
			pageTitle,
			[MODEL_TO_PROP_NAME_MAP[model]]: instance
		};

		const PageComponent = instancePages[MODEL_TO_PAGE_COMPONENT_MAP[model]];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

};
