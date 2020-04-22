import React from 'react';

import { App, RelatedInstance } from '../../components';

export default class Person extends React.Component {

	render () {

		const { documentTitle, pageTitle, person } = this.props;

		const { model, productions } = person;

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
