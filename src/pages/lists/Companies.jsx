import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const Companies = props => {

	const { documentTitle, pageTitle, companies } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={companies} />

		</App>
	);

};

export default Companies;
