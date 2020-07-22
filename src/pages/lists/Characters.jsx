import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const Characters = props => {

	const { documentTitle, pageTitle, characters } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={characters} />

		</App>
	);

};

export default Characters;
