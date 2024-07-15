import renderComponentToString from './render-component-to-string.jsx';

export default async (response, PageComponent, props) => {

	return response.send(
		`
			<!doctype html>
			${renderComponentToString(PageComponent, props)}
		`
	);

};
