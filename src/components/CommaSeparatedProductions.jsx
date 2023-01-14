import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { ProductionLinkWithContext } from '.';

const CommaSeparatedProductions = props => {

	const { productions } = props;

	return (
		<Fragment>

			{
				productions
					.map((production, index) =>
						<Fragment key={index}>

							<ProductionLinkWithContext production={production} />

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, ', ', currentValue])
			}

		</Fragment>
	);

};

export default CommaSeparatedProductions;
