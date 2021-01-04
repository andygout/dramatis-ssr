import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const Materials = props => {

	const { documentTitle, pageTitle, materials } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={materials} />

		</App>
	);

};

export default Materials;
