import { App } from '../../components/index.js';

const Place = (props) => {
	const { currentPath, documentTitle, pageTitle, place } = props;

	const { model } = place;

	return <App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model} />;
};

export default Place;
