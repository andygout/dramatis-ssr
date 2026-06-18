import { App, InstanceLinksList } from '../../components/index.js';

const Places = (props) => {
	const { documentTitle, pageTitle, places } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>
			<InstanceLinksList instances={places} />
		</App>
	);
};

export default Places;
