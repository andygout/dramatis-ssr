import { App } from '../../components/index.js';

const Locale = (props) => {
	const { currentPath, documentTitle, pageTitle, locale } = props;

	const { model } = locale;

	return <App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model} />;
};

export default Locale;
