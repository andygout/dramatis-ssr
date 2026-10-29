import { App, InstanceFacet, InstanceLinksList, MaterialsList } from '../../components/index.js';

const Place = (props) => {
	const { currentPath, documentTitle, pageTitle, place } = props;

	const { model, surPlaces, subPlaces, materials } = place;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>
			{surPlaces?.length > 0 && (
				<InstanceFacet labelText="Is within (bounding boxes)">
					<InstanceLinksList instances={surPlaces} />
				</InstanceFacet>
			)}

			{subPlaces?.length > 0 && (
				<InstanceFacet labelText="Contains (bounding boxes)">
					<InstanceLinksList instances={subPlaces} />
				</InstanceFacet>
			)}

			{materials?.length > 0 && (
				<InstanceFacet labelText="Materials as setting">
					<MaterialsList materials={materials} />
				</InstanceFacet>
			)}
		</App>
	);
};

export default Place;
