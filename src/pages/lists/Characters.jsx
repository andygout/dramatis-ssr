import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components';

const Characters = props => {

	const { documentTitle, pageTitle, characters } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={characters} />

		</App>
	);

};

export default Characters;
