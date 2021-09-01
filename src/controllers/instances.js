import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import getDifferentiatorSuffix from '../lib/get-differentiator-suffix';
import getInstanceTitle from '../lib/get-instance-title';
import { instancePages } from '../pages';
import { MODEL_TO_DISPLAY_NAME_MAP, MODEL_TO_PAGE_COMPONENT_MAP, MODEL_TO_PROP_NAME_MAP } from '../utils/constants';

const compressTitleComponents = components => components.filter(Boolean).join(' ');

export default async (request, response, next) => {

	const apiPath = request.path;

	try {

		const instance = await fetchFromApi(apiPath);

		const { model, differentiator } = instance;

		const title = getInstanceTitle(instance);

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
