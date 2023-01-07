import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, ProductionsList } from '../../components';

const Productions = props => {

	const { documentTitle, pageTitle, productions } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<ProductionsList productions={productions} />

		</App>
	);

};

export default Productions;
