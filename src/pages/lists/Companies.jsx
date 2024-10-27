import { App, InstanceLinksList } from '../../components/index.js';

const Companies = props => {

	const { documentTitle, pageTitle, companies } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={companies} />

		</App>
	);

};

export default Companies;
