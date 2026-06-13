import { App } from '../../components/index.js';

const Time = (props) => {
	const { currentPath, documentTitle, pageTitle, time } = props;

	const { model } = time;

	return <App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model} />;
};

export default Time;
