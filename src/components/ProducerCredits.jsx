import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { ProducerEntities } from './index.js';
import { capitalise } from '../lib/strings.js';

const ProducerCredits = props => {

	const { credits } = props;

	return (
		<Fragment>

			{
				credits
					.map((credit, index) => {

						const creditName = index === 0
							? capitalise(credit.name)
							: credit.name;

						return (
							<Fragment key={index}>

								<Fragment>{`${creditName} `}</Fragment>

								<ProducerEntities entities={credit.entities} />

							</Fragment>
						);

					})
					.reduce((accumulator, currentValue) => [accumulator, '; ', currentValue])
			}

		</Fragment>
	);

};

export default ProducerCredits;
