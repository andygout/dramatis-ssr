import sendResponse from './helpers/send-response.js';
import { Home } from '../pages/index.js';

export default response => {

	const title = 'Home';

	const props = {
		documentTitle: title,
		pageTitle: title
	};

	const PageComponent = Home;

	return sendResponse(response, PageComponent, props);

};
