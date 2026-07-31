import { App, InstanceFacet, MaterialsList } from '../../components/index.js';

const Time = (props) => {
	const { currentPath, documentTitle, pageTitle, time } = props;

	const { model, materials } = time;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>
			{materials?.length > 0 && (
				<InstanceFacet labelText="Materials as setting">
					<MaterialsList materials={materials} />
				</InstanceFacet>
			)}
		</App>
	);
};

export default Time;
