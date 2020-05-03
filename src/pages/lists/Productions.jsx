import { h } from 'preact';

import { App, List } from '../../components';

export default function (props) {

	const { documentTitle, pageTitle, productions } = props;

	return (
		<App documentTitle={documentTitle} pageTitle={pageTitle}>

			<List instances={productions} />

		</App>
	);

};
