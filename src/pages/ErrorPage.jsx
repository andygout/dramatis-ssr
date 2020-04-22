import React from 'react';

import { App } from '../components';

export default class ErrorPage extends React.Component {

	render () {

		const { documentTitle, pageTitle } = this.props;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle}>

				<div>This is the error page</div>

			</App>
		);

	};

};
