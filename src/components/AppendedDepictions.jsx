import { Fragment } from 'preact';

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
									<Fragment>
										{' (as '}<span className="fictional-name-text">{ depiction.displayName }</span>)
									</Fragment>
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
					.reduce((accumulator, currentValue) => [accumulator, ' /', currentValue])
			}

		</Fragment>
	);

};

export default AppendedDepictions;
