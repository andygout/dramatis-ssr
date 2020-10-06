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
									<span> (as <span className="role-text">{ depiction.displayName }</span>)</span>
								)
							}

							{
								depiction.qualifier && (
									<span> ({ depiction.qualifier })</span>
								)
							}

							{
								depiction.group && (
									<span> ({ depiction.group })</span>
								)
							}

						</Fragment>
					)
					.reduce((prev, curr) => [prev, ' / ', curr])
			}

		</Fragment>
	);

};

export default AppendedDepictions;
