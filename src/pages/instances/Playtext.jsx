import React from 'react';

import { App, RelatedInstance } from '../../components';

export default class Playtext extends React.Component {

	render () {

		const { documentTitle, pageTitle, playtext } = this.props;

		const { model, productions, characters } = playtext;

		return (
			<App documentTitle={documentTitle} pageTitle={pageTitle} model={model}>

				{
					productions && productions.length > 0 && (
						<RelatedInstance labelText='Productions' instance={productions} />
					)
				}

				{
					characters && characters.length > 0 && (
						<RelatedInstance labelText='Characters' instance={characters} />
					)
				}

			</App>
		);

	};

};
