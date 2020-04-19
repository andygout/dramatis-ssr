import React from 'react';

import { App, List } from '../../components';

export default class Playtexts extends React.Component {

	render () {

		const { documentTitle, pageTitle, playtexts } = this.props;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle}>

				<List instances={playtexts} />

			</App>
		);

	};

};
