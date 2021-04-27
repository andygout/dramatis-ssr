import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const Venues = props => {

	const { documentTitle, pageTitle, venues } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={venues} />

		</App>
	);

};

export default Venues;
