import { App, InstanceLinksList } from '../../components/index.js';

const Locales = (props) => {
	const { documentTitle, pageTitle, locales } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>
			<InstanceLinksList instances={locales} />
		</App>
	);
};

export default Locales;
