import React from 'react';

import { App, List } from '../../components';

export default class People extends React.Component {

	render () {

		const { documentTitle, pageTitle, people } = this.props;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle}>

				<List instances={people} />

			</App>
		);

	};

};
