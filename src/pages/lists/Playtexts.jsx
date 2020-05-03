import { h } from 'preact';

import { App, List } from '../../components';

export default function (props) {

	const { documentTitle, pageTitle, playtexts } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={playtexts} />

		</App>
	);

};
