import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { ProducerEntities } from '.';
import { capitalise } from '../lib/strings';

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

								<Fragment>{ creditName }&nbsp;</Fragment>

								<ProducerEntities entities={credit.entities} />

							</Fragment>
						);

					})
					.reduce((prev, curr) => [prev, '; ', curr])
			}

		</Fragment>
	);

};

export default ProducerCredits;
