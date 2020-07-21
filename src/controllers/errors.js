import sendResponse from './helpers/send-response';
import { ErrorPage } from '../pages';

export default (error, request, response) => {

	const title = `Error: ${error.status} ${error.message}`;

	const props = {
		documentTitle: title,
		pageTitle: title
	};

	const PageComponent = ErrorPage;

	return sendResponse(response, PageComponent, props);

};
