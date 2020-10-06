import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

const AppendedDisplayName = props => {

	const { displayName } = props;

	return (
		<span> (as <span className="role-text">{ displayName }</span>)</span>
	);

};

export default AppendedDisplayName;
