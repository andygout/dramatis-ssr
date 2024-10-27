import { App, MaterialsList } from '../../components/index.js';

const Materials = props => {

	const { documentTitle, pageTitle, materials } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<MaterialsList materials={materials} />

		</App>
	);

};

export default Materials;
