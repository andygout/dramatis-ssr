import React from 'react';

import { App, RelatedInstance } from '../../components';

export default class Theatre extends React.Component {

	render () {

		const { documentTitle, pageTitle, theatre } = this.props;

		const { model, productions } = theatre;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

				{
					productions && productions.length > 0 && (
						<RelatedInstance labelText='Productions' instance={productions} />
					)
				}

			</App>
		);

	};

};
