import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from './index.js';

const CommaSeparatedInstanceLinks = props => {

	const { instances } = props;

	return (
		<Fragment>

			{
				instances
					.map((instance, index) =>
						<Fragment key={index}>

							<InstanceLink instance={instance} />

						</Fragment>
					)
					.reduce((accumulator, currentValue) => [accumulator, ', ', currentValue])
			}

		</Fragment>
	);

};

export default CommaSeparatedInstanceLinks;
