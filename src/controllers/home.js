import sendResponse from './helpers/send-response';
import { Home } from '../pages';

export default function (response) {

	const title = 'Home';

	const props = {
		documentTitle: title,
		pageTitle: title
	};

	const PageComponent = Home;

	return sendResponse(response, PageComponent, props);

}
