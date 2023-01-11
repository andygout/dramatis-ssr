import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedQualifier = props => {

	const { qualifier } = props;

	return (
		<Fragment>

			{` (${qualifier})`}

		</Fragment>
	);

};

export default AppendedQualifier;
