import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedDepictions = props => {

	const { depictions } = props;

	return (
		<Fragment>

			{
				depictions
					.map((depiction, index) =>
						<Fragment key={index}>

							{
								depiction.displayName && (
									<Fragment>{' (as '}<span className="role-text">{ depiction.displayName }</span>)</Fragment>
								)
							}

							{
								depiction.qualifier && (
									<Fragment>{` (${depiction.qualifier})`}</Fragment>
								)
							}

							{
								depiction.group && (
									<Fragment>{` (${depiction.group})`}</Fragment>
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ' /', curr])
			}

		</Fragment>
	);

};

export default AppendedDepictions;
