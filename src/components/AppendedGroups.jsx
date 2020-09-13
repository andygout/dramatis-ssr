import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedGroups = props => {

	const { groups } = props;

	return (
		<Fragment>

			<span> ({groups.reduce((prev, curr) => [prev, ', ', curr])})</span>

		</Fragment>
	);

};

export default AppendedGroups;
