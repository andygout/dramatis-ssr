import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { InstanceLink } from '.';

const JoinedRoles = props => {

	const { instances } = props;

	return (
		<span className="fictional-name-text">

			{
				instances
					.map((instance, index) =>
						<Fragment key={index}>

							{
								instance.uuid
									? <InstanceLink instance={instance} />
									: instance.name
							}

							{
								instance.qualifier && (
									<Fragment>{` (${instance.qualifier})`}</Fragment>
								)
							}

							{
								instance.isAlternate && (
									<Fragment>{' (alt)'}</Fragment>
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}

		</span>
	);

};

export default JoinedRoles;
