import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components/index.js';

const Awards = props => {

	const { documentTitle, pageTitle, awards } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={awards} />

		</App>
	);

};

export default Awards;
