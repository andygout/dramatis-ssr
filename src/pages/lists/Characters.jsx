import React from 'react';

import { App, List } from '../../components';

export default class Characters extends React.Component {

	render () {

		const { documentTitle, pageTitle, characters } = this.props;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle}>

				<List instances={characters} />

			</App>
		);

	};

};
