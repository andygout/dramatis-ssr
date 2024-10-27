import { App, InstanceLinksList } from '../../components/index.js';

const Seasons = props => {

	const { documentTitle, pageTitle, seasons } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={seasons} />

		</App>
	);

};

export default Seasons;
