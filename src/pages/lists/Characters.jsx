import { h } from 'preact';

import { App, List } from '../../components';

export default props => {

	const { documentTitle, pageTitle, characters } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={characters} />

		</App>
	);

};
