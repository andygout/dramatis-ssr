import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const Productions = props => {

	const { documentTitle, pageTitle, productions } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={productions} />

		</App>
	);

};

export default Productions;
