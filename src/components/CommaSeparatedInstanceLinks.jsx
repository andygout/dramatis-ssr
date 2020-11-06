import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const CommaSeparatedInstanceLinks = props => {

	const { instances } = props;

	return (
		<Fragment>

			{
				instances
					.map((instance, index) =>
						<Fragment key={index}>

							{
								instance.uuid
									? <InstanceLink instance={instance} />
									: instance.name
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ', ', curr])
			}

		</Fragment>
	);

};

export default CommaSeparatedInstanceLinks;
