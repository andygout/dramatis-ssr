import { h } from 'preact';

import { App } from '../components';

export default props => {

	const { documentTitle, pageTitle } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<div>This is the error page</div>

		</App>
	);

};
