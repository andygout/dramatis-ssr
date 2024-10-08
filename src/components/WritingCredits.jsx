import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { WritingEntities } from './index.js';
import { capitalise } from '../lib/strings.js';

const WritingCredits = props => {

	const { credits, isAppendage } = props;

	return (
		<Fragment>

			{
				credits
					.map((credit, index) => {

						const creditName = !isAppendage && index === 0
							? capitalise(credit.name)
							: credit.name;

						return (
							<Fragment key={index}>

								<Fragment>{`${creditName} `}</Fragment>

								<WritingEntities entities={credit.entities} />

							</Fragment>
						);

					})
					.reduce((accumulator, currentValue) => [accumulator, '; ', currentValue])
			}

		</Fragment>
	);

};

export default WritingCredits;
