import sendResponse from './helpers/send-response';
import fetchFromApi from '../lib/fetch-from-api';
import getDifferentiatorSuffix from '../lib/get-differentiator-suffix';
import { capitalise, singularise } from '../lib/strings';
import { instancePages } from '../pages';

export default async (request, response, next) => {

	const apiPath = request.path;

	try {

		const instance = await fetchFromApi(apiPath);

		const { name, differentiator } = instance;

		const pluralisedModel = request.path.split('/')[1];

		const model = singularise(pluralisedModel);

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

		const PageComponent = instancePages[capitalise(model)];

		return sendResponse(response, PageComponent, props);

	} catch (error) {

		return next(error);

	}

};
