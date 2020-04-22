import React from 'react';

import { App, RelatedInstance } from '../../components';

export default class Character extends React.Component {

	render () {

		const { documentTitle, pageTitle, character } = this.props;

		const { model, playtexts, variantNames, productions } = character;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

				{
					playtexts && playtexts.length > 0 && (
						<RelatedInstance labelText='Playtexts' instance={playtexts} />
					)
				}

				{
					variantNames && variantNames.length > 0 && (
						<RelatedInstance labelText='Variant names' instance={variantNames} join />
					)
				}

				{
					productions && productions.length > 0 && (
						<RelatedInstance labelText='Productions' instance={productions} />
					)
				}

			</App>
		);

	};

};
