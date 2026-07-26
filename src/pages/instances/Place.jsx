import { App, InstanceFacet, MaterialsList } from '../../components/index.js';

const Place = (props) => {
	const { currentPath, documentTitle, pageTitle, place } = props;

	const { model, materials } = place;

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

export default Place;
