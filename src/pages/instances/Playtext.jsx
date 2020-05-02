import React from 'react';

import { App, InstanceFacet, List } from '../../components';

export default class Playtext extends React.Component {

	render () {

		const { documentTitle, pageTitle, playtext } = this.props;

		const { model, productions, characters } = playtext;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

				{
					productions && productions.length > 0 && (
						<InstanceFacet labelText='Productions'>

							<List instances={productions} />

						</InstanceFacet>
					)
				}

				{
					characters && characters.length > 0 && (
						<InstanceFacet labelText='Characters'>

							<List instances={characters} />

						</InstanceFacet>
					)
				}

			</App>
		);

	};

};
