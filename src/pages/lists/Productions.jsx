import { App, ProductionsList } from '../../components/index.js';

const Productions = props => {

	const { documentTitle, pageTitle, productions } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<ProductionsList productions={productions} />

		</App>
	);

};

export default Productions;
