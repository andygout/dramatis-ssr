import React from 'react';

import { App, RelatedInstance } from '../../components';

export default class Production extends React.Component {

	render () {

		const { documentTitle, pageTitle, production } = this.props;

		const { model, theatre, playtext, cast } = production;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

				{
					theatre && (
						<RelatedInstance labelText='Theatre' instance={theatre} />
					)
				}

				{
					playtext && (
						<RelatedInstance labelText='Playtext' instance={playtext} />
					)
				}

				{
					cast && cast.length > 0 && (
						<RelatedInstance labelText='Cast' instance={cast} />
					)
				}

			</App>
		);

	};

};
