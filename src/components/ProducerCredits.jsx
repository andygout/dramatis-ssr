import { Fragment } from 'preact';

import { capitalise } from '../lib/strings.js';
import ProducerEntities from './ProducerEntities.jsx';

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
