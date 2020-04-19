import React from 'react';

import { App, List } from '../../components';

export default class Theatres extends React.Component {

	render () {

		const { documentTitle, pageTitle, theatres } = this.props;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle}>

				<List instances={theatres} />

			</App>
		);

	};

};
