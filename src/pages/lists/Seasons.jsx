import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components';

const Seasons = props => {

	const { documentTitle, pageTitle, seasons } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={seasons} />

		</App>
	);

};

export default Seasons;
