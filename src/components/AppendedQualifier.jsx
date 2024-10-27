import { Fragment } from 'preact';

const AppendedQualifier = props => {

	const { qualifier } = props;

	return (
		<Fragment>

			{` (${qualifier})`}

		</Fragment>
	);

};

export default AppendedQualifier;
