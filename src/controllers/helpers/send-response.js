import renderComponentToString from './render-component-to-string';

export default async function (response, PageComponent, props) {

	return response.send(
		`
			<!doctype html>
			${renderComponentToString(PageComponent, props)}
		`
	);

}
