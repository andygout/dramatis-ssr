import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const People = props => {

	const { documentTitle, pageTitle, people } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={people} />

		</App>
	);

};

export default People;
