import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../../components';

const Festival = props => {

	const { currentPath, documentTitle, pageTitle, festival } = props;

	const { model } = festival;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model} />
	);

};

export default Festival;
