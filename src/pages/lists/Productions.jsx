import React from 'react';

import { App, List } from '../../components';

export default class Productions extends React.Component {

	render () {

		const { documentTitle, pageTitle, productions } = this.props;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle}>

				<List instances={productions} />

			</App>
		);

	};

};
