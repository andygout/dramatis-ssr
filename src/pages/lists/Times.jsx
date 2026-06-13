import { App, InstanceLinksList } from '../../components/index.js';

const Times = (props) => {
	const { documentTitle, pageTitle, times } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>
			<InstanceLinksList instances={times} />
		</App>
	);
};

export default Times;
