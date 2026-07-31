import { App, InstanceFacet, MaterialsList } from '../../components/index.js';

const Locale = (props) => {
	const { currentPath, documentTitle, pageTitle, locale } = props;

	const { model, materials } = locale;

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

export default Locale;
