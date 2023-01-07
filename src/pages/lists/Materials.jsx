import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, MaterialsList } from '../../components';

const Materials = props => {

	const { documentTitle, pageTitle, materials } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<MaterialsList materials={materials} />

		</App>
	);

};

export default Materials;
