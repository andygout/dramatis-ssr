import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components';

const Companies = props => {

	const { documentTitle, pageTitle, companies } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={companies} />

		</App>
	);

};

export default Companies;
