import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components';

const Festivals = props => {

	const { documentTitle, pageTitle, festivals } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={festivals} />

		</App>
	);

};

export default Festivals;
