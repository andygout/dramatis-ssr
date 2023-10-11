import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, InstanceLinksList } from '../../components';

const FestivalSerieses = props => {

	const { documentTitle, pageTitle, festivalSerieses } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<InstanceLinksList instances={festivalSerieses} />

		</App>
	);

};

export default FestivalSerieses;
