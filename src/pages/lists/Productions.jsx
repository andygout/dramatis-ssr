import { h } from 'preact';

import { App, List } from '../../components';

export default props => {

	const { documentTitle, pageTitle, productions } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={productions} />

		</App>
	);

};
