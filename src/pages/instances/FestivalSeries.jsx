import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App } from '../../components';

const FestivalSeries = props => {

	const { currentPath, documentTitle, pageTitle, festivalSeries } = props;

	const { model } = festivalSeries;

	return (
		<App currentPath={currentPath} documentTitle={documentTitle} pageTitle={pageTitle} model={model} />
	);

};

export default FestivalSeries;
