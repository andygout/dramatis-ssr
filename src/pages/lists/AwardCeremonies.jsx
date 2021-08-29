import { h } from 'preact'; // eslint-disable-line no-unused-vars

import { App, List } from '../../components';

const AwardCeremonies = props => {

	const { documentTitle, pageTitle, awardCeremonies } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={awardCeremonies} />

		</App>
	);

};

export default AwardCeremonies;
