import sendResponse from './helpers/send-response.js';
import { ErrorPage } from '../pages/index.js';

export default (error, request, response) => {

	const title = `Error: ${error.status} ${error.message}`;

	const props = {
		documentTitle: title,
		pageTitle: title
	};

	const PageComponent = ErrorPage;

	return sendResponse(response, PageComponent, props);

};
