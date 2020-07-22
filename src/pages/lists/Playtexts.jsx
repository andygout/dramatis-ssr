import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const Playtexts = props => {

	const { documentTitle, pageTitle, playtexts } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={playtexts} />

		</App>
	);

};

export default Playtexts;
