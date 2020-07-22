import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const Theatres = props => {

	const { documentTitle, pageTitle, theatres } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={theatres} />

		</App>
	);

};

export default Theatres;
