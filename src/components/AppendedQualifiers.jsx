import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedQualifiers = props => {

	const { qualifiers } = props;

	return (
		<Fragment>

			<span> ({qualifiers.reduce((prev, curr) => [prev, ', ', curr])})</span>

		</Fragment>
	);

};

export default AppendedQualifiers;
