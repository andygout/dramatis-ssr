import { App, InstanceLinksList } from '../../components/index.js';

const Characters = props => {

	const { documentTitle, pageTitle, characters } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={characters} />

		</App>
	);

};

export default Characters;
