import { App, InstanceFacet, InstanceLinksList, MaterialsList } from '../../components/index.js';

const Time = (props) => {
	const { currentPath, documentTitle, pageTitle, time } = props;

	const { model, surTimes, subTimes, materials } = time;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model}>
			{surTimes?.length > 0 && (
				<InstanceFacet labelText="Is within">
					<InstanceLinksList instances={surTimes} />
				</InstanceFacet>
			)}

			{subTimes?.length > 0 && (
				<InstanceFacet labelText="Contains">
					<InstanceLinksList instances={subTimes} />
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

export default Time;
