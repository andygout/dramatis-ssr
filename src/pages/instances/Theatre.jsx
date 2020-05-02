import React from 'react';

import { App, InstanceFacet, List } from '../../components';

export default class Theatre extends React.Component {

	render () {

		const { documentTitle, pageTitle, theatre } = this.props;

		const { model, productions } = theatre;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

				{
					productions && productions.length > 0 && (
						<InstanceFacet labelText='Productions'>

							<List instances={productions} />

						</InstanceFacet>
					)
				}

			</App>
		);

	};

};
