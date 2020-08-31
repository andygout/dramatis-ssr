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

		let documentTitle = `${instance.name} (${model})`;

		let pageTitle = instance.name;

		if (instance.differentiator) {

			const differentiatorSuffix = ` (${instance.differentiator})`;

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
