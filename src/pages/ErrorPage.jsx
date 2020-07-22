import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../components';

const ErrorPage = props => {

	const { documentTitle, pageTitle } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<div>This is the error page</div>

		</App>
	);

};

export default ErrorPage;
