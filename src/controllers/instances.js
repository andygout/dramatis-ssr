import sendResponse from './helpers/send-response.js';
import fetchFromApi from '../lib/fetch-from-api.js';
import getDifferentiatorSuffix from '../lib/get-differentiator-suffix.js';
import getInstanceTitle from '../lib/get-instance-title.js';
import { instancePages } from '../pages/index.js';
import { MODEL_TO_DISPLAY_NAME_MAP, MODEL_TO_PAGE_COMPONENT_MAP, MODEL_TO_PROP_NAME_MAP } from '../utils/constants.js';

const compressTitleComponents = components => components.filter(Boolean).join(' ');

export default async (request, response, next) => {

	const { path } = request;

	try {

		const instance = await fetchFromApi(path);

		const { model, differentiator } = instance;

		const title = getInstanceTitle(instance);

		const pageSubtitle = instance.subtitle;

		const differentiatorSuffix = getDifferentiatorSuffix(differentiator);

		const documentTitle = compressTitleComponents([
			title,
			`(${MODEL_TO_DISPLAY_NAME_MAP[model]})`,
			differentiatorSuffix
		]);

		const pageTitle = compressTitleComponents([
			title,
			differentiatorSuffix
		]);

		const props = {
			currentPath: path,
			documentTitle,
			pageTitle,
			pageSubtitle,
			[MODEL_TO_PROP_NAME_MAP[model]]: instance
		};

		const PageComponent = instancePages[MODEL_TO_PAGE_COMPONENT_MAP[model]];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

};
