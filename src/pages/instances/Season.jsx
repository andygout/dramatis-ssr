import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../../components';

const Season = props => {

	const { currentPath, documentTitle, pageTitle, season } = props;

	const { model } = season;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model} />
	);

};

export default Season;
